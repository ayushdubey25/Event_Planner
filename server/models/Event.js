const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    date: Date,
    time: String,
    venue: String,
    budget: { type: Number, default: 0 },
    organizer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    vendors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    sponsors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);
