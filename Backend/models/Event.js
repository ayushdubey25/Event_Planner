const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  organizer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  type: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  venue: { type: String, required: true },
  description: { type: String },
  capacity: { type: Number, default: 100 },
  status: { type: String, default: 'Draft' }, // Draft, Active, Completed
  attendeesCount: { type: Number, default: 0 },
  budget: {
    total: { type: Number, default: 0 },
    categories: [{ name: String, amount: Number }]
  },
  timeline: [
    {
      task: String,
      deadline: String,
      assigned: String
    }
  ],
}, { timestamps: true });

module.exports = mongoose.model('Event', EventSchema);
