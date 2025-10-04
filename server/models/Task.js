const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  status: { type: String, enum: ['todo', 'inprogress', 'done'], default: 'todo' },
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  vendorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },

  // --- Optional fields for scheduling ---
  startTime: { type: Date, default: null },
  endTime: { type: Date, default: null },

  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Task', taskSchema);
