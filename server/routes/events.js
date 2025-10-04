const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const Task = require('../models/Task');
const authMiddleware = require('../middleware/authMiddleware');

// Create Event
router.post('/create', authMiddleware, async (req,res)=>{
    try{
        const { title, description, date, time, venue, budget } = req.body;
        const event = await Event.create({ title, description, date, time, venue, budget, organizer: req.user.id });
        res.json(event);
    }catch(err){ res.status(500).json({ message: err.message }); }
});

// Get Events of Organizer
router.get('/my', authMiddleware, async (req,res)=>{
    try{
        const events = await Event.find({ organizer: req.user.id }).populate('attendees vendors sponsors');
        res.json(events);
    }catch(err){ res.status(500).json({ message: err.message }); }
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

module.exports = router;
