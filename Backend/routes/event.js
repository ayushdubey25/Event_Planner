const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const authMiddleware = require('../middleware/authMiddleware'); // Protect routes with JWT

// Create Event
router.post('/create', authMiddleware, async (req, res) => {
  try {
    const { name, type, date, time, venue, description, capacity } = req.body;
    const organizer = req.user.id; // from JWT

    const newEvent = new Event({
      organizer,
      name,
      type,
      date,
      time,
      venue,
      description,
      capacity,
      status: 'Draft'
    });

    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server Error' });
  }
});

// Get Organizer Events
router.get('/my-events', authMiddleware, async (req, res) => {
  try {
    const events = await Event.find({ organizer: req.user.id }).sort({ createdAt: -1 });
    res.json(events);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server Error' });
  }
});

// Update Event (for AI plan, Orchestration, Analytics)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ msg: 'Event not found' });
    if (event.organizer.toString() !== req.user.id) return res.status(401).json({ msg: 'Unauthorized' });

    Object.assign(event, req.body); // merge updates
    const updatedEvent = await event.save();
    res.json(updatedEvent);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server Error' });
  }
});

module.exports = router;
