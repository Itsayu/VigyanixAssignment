const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

router.post('/', async (req, res) => {
  try {
    const { taskNumber, estimateHours, estimateNotes } = req.body;
    let task = await Task.findOne({ taskNumber });
    if (task) {
      return res.status(400).json({ message: 'Task already exists' });
    }
    task = new Task({ taskNumber, estimateHours: [estimateHours], estimateNotes: [estimateNotes] });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:taskNumber', async (req, res) => {
  try {
    const { taskNumber } = req.params;
    const { estimateHours, estimateNotes, actualHours, notes, completed } = req.body;
    let task = await Task.findOne({ taskNumber });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    if (completed) {
      task.actualHours = actualHours;
      task.notes = notes;
      task.completed = true;
    } else {
      task.estimateHours.push(estimateHours);
      task.estimateNotes.push(estimateNotes);
    }
    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:taskNumber', async (req, res) => {
  try {
    const { taskNumber } = req.params;
    const task = await Task.findOne({ taskNumber });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
