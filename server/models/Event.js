const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  venue: { type: String, required: true },
  description: { type: String },
  capacity: { type: Number },
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  attendees: [{                  // ✅ Add this field
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  vendors: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  // ✅ Add sponsors array
  sponsors: [{
    sponsorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    amount: Number,
    status: {
      type: String,
      enum: ['pending', 'paid'],
      default: 'pending'
    },
    material: String // uploaded file name
  }]
});

module.exports = mongoose.model('Event', eventSchema);
