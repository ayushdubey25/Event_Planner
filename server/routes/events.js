const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const Task = require('../models/Task');
const authMiddleware = require('../middleware/authMiddleware');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const mongoose = require('mongoose');

// Create Event
// Create Event
router.post('/create', authMiddleware, async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'Unauthorized or invalid token' });
    }

    const { title, name, description, date, time, venue, budget, type } = req.body;

    const event = await Event.create({
      name: name || title,         // ✅ use either 'name' or fallback to 'title'
      type: type || "general",     // ✅ ensure type is set
      description,
      date,
      time,
      venue,
      capacity: 100,
      budget,
      organizer: req.user.id
    });

    res.json(event);
  } catch (err) {
    console.error('Event creation failed:', err);
    res.status(500).json({ message: err.message });
  }
});


// Get Events of Organizer
router.get('/my', authMiddleware, async (req,res)=>{
    try{
        const events = await Event.find({ organizer: req.user.id }).populate('attendees vendors sponsors');
        res.json(events);
    }catch(err){ res.status(500).json({ message: err.message }); }
});

// ✅ Multer setup for sponsor uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// ✅ Organizer assigns sponsor to event
router.post('/:eventId/assign-sponsor', authMiddleware, async (req, res) => {
  try {
    const { sponsorId, amount } = req.body;
    const event = await Event.findById(req.params.eventId);

    if (!event) return res.status(404).json({ message: 'Event not found' });

    event.sponsors.push({ sponsorId, amount });
    await event.save();

    res.json({ message: 'Sponsor assigned successfully', event });
  } catch (err) {
    console.error('Error assigning sponsor:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ Sponsor fetches their events
router.get('/sponsor/events', authMiddleware, async (req, res) => {
  try {
    const sponsorId = req.user.id;
    const events = await Event.find({ 'sponsors.sponsorId': sponsorId })
      .populate('organizer', 'name email')
      .populate('sponsors.sponsorId', 'name email');
    res.json(events);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch sponsor events' });
  }
});

// ✅ Sponsor uploads material
router.post('/:eventId/upload-material', authMiddleware, upload.single('file'), async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    const sponsorIndex = event.sponsors.findIndex(s => s.sponsorId.toString() === req.user.id);
    if (sponsorIndex === -1)
      return res.status(403).json({ message: 'You are not a sponsor for this event' });

    event.sponsors[sponsorIndex].material = req.file.filename;
    event.sponsors[sponsorIndex].status = 'paid';
    await event.save();

    res.json({ message: 'File uploaded successfully', event });
  } catch (err) {
    console.error('Error uploading material:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add Attendee / Vendor / Sponsors
router.put('/:id/add', authMiddleware, async (req,res)=>{
    try{
        const event = await Event.findById(req.params.id);
        const { type, userId } = req.body;
        if(type==='attendee') event.attendees.push(userId);
        if(type==='vendor') event.vendors.push(userId);
        if(type==='sponsor') event.sponsors.push(userId);
        await event.save();
        res.json(event);
    }catch(err){ res.status(500).json({ message: err.message }); }
});

// --- Get all events (for attendee dashboard) ---
router.get('/', authMiddleware, async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Server error' });
    }
});


// --- Get attendee's booked events ---
router.get('/my-booked', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'attendee')
      return res.status(403).json({ message: 'Only attendees can view booked events' });

    const events = await Event.find({ attendees: new mongoose.Types.ObjectId(req.user.id) });

    // Optional: send consistent field `title` for frontend
    const eventsWithTitle = events.map(ev => ({
      _id: ev._id,
      title: ev.title || ev.name,  // ensures frontend sees title
      date: ev.date,
      time: ev.time,
      venue: ev.venue
    }));

    res.json(eventsWithTitle);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// --- Book Event + Generate Ticket ---
router.post('/:eventId/book', authMiddleware, async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    const userId = req.user.id;

    // Ensure attendees array exists
    if (!Array.isArray(event.attendees)) event.attendees = [];

    // Prevent duplicate booking
    if (event.attendees.includes(userId)) {
      return res.status(400).json({ message: 'Already booked' });
    }

    event.attendees.push(userId);
    await event.save();

    // Generate PDF ticket
    const ticketDir = path.join(__dirname, '../tickets');
    if (!fs.existsSync(ticketDir)) fs.mkdirSync(ticketDir);

    const filePath = path.join(ticketDir, `${userId}-${event._id}.pdf`);
    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream(filePath));

    doc.fontSize(20).text('Event Ticket', { align: 'center' });
    doc.moveDown();
    doc.fontSize(14).text(`Event: ${event.name || event.title}`);
    doc.text(`Date: ${new Date(event.date).toLocaleDateString()}`);
    doc.text(`Time: ${event.time}`);
    doc.text(`Venue: ${event.venue}`);
    doc.text(`Attendee: ${req.user.name}`);
    doc.end();

    res.json({
      message: 'Booked successfully',
      ticket: `/tickets/${userId}-${event._id}.pdf`
    });
  } catch (err) {
    console.error('Booking failed:', err);
    res.status(500).json({ message: 'Booking failed' });
  }
});


module.exports = router;
