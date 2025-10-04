const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const User = require('../models/User');
const SponsorRequest = require('../models/SponsorRequest');
const authMiddleware = require('../middleware/authMiddleware');

// --- Organizer sends sponsor request ---
router.post('/request', authMiddleware, async (req, res) => {
    try {
        const { eventId, sponsorId, amount } = req.body;
        const request = await SponsorRequest.create({
            eventId,
            sponsorId,
            amount: amount || 0,
            status: 'pending'
        });
        await request.populate('sponsorId', 'name email');
        res.json(request);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to send sponsor request' });
    }
});

// --- Get all sponsor requests for an event (Organizer view) ---
router.get('/event/:eventId', authMiddleware, async (req, res) => {
    try {
        const requests = await SponsorRequest.find({ eventId: req.params.eventId })
            .populate('sponsorId', 'name email');
        res.json(requests);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch sponsor requests' });
    }
});

// --- Sponsor fetches pending requests ---
router.get('/pending', authMiddleware, async (req, res) => {
    try {
        const requests = await SponsorRequest.find({ sponsorId: req.user.id, status: 'pending' })
            .populate('eventId', 'title date venue');
        res.json(requests);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch requests' });
    }
});

// --- Sponsor accepts/rejects ---
router.put('/:id/respond', authMiddleware, async (req, res) => {
    try {
        const { status } = req.body; // 'accepted' or 'rejected'
        const request = await SponsorRequest.findById(req.params.id);

        if (!request) return res.status(404).json({ error: 'Request not found' });

        request.status = status;
        await request.save();

        if (status === 'accepted') {
            const event = await Event.findById(request.eventId);
            if (!event) return res.status(404).json({ error: 'Event not found' });

            if (!event.sponsors) event.sponsors = [];
            event.sponsors.push({ sponsorId: request.sponsorId, amount: request.amount });
            await event.save();
        }

        res.json(request);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update request' });
    }
});


module.exports = router;
