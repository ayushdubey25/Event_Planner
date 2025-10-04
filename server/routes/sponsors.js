const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const authMiddleware = require('../middleware/authMiddleware');

// --- Sponsor analytics ---
router.get('/:id/analytics', authMiddleware, async (req, res) => {
    try {
        if (req.user.role !== 'sponsor') return res.status(403).json({ message: 'Unauthorized' });
        const event = await Event.findById(req.params.id)
            .populate('attendees')
            .populate('sponsors');

        if (!event) return res.status(404).json({ message: 'Event not found' });

        // Example metrics
        const analytics = {
            attendeesCount: event.attendees.length,
            sponsorsCount: event.sponsors.length,
            engagementRate: Math.round(Math.random()*100) // placeholder
        };
        res.json(analytics);
    } catch(err){ console.log(err); res.status(500).json({ message: 'Server error' }); }
});

// --- Get contracts/deliverables ---
router.get('/:id/contracts', authMiddleware, async (req, res) => {
    try {
        if (req.user.role !== 'sponsor') return res.status(403).json({ message: 'Unauthorized' });
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ message: 'Event not found' });

        res.json({ contracts: event.sponsorContracts || [] }); // sponsorContracts array in Event schema
    } catch(err){ console.log(err); res.status(500).json({ message: 'Server error' }); }
});

// Send sponsor request
router.post('/request', authMiddleware, async (req, res) => {
  try {
    const { eventId, sponsorId } = req.body;
    const newRequest = new SponsorRequest({
      eventId,
      sponsorId,
      status: 'pending',
    });
    const savedRequest = await newRequest.save();
    await savedRequest.populate('sponsorId', 'name email');
    res.json(savedRequest);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to send sponsor request' });
  }
});

// Get all sponsor requests for an event
router.get('/event/:eventId', authMiddleware, async (req, res) => {
  try {
    const requests = await SponsorRequest.find({ eventId: req.params.eventId })
      .populate('sponsorId', 'name email');
    res.json(requests);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch sponsor requests' });
  }
});


module.exports = router;
