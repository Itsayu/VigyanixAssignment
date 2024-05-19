const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  taskNumber: { type: String, unique: true, required: true },
  estimateHours: [{ type: Number }],
  estimateNotes: [{ type: String }],
  actualHours: { type: Number, default: 0 },
  notes: { type: String, default: '' },
  completed: { type: Boolean, default: false }
});

module.exports = mongoose.model('Task', taskSchema);
