const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const authMiddleware = require('../middleware/authMiddleware');

// Get tasks of an event
router.get('/:eventId', authMiddleware, async (req,res)=>{
    try{
        const tasks = await Task.find({ event: req.params.eventId });
        res.json(tasks);
    }catch(err){ res.status(500).json({ message: err.message }); }
});

// Add task
router.post('/:eventId', authMiddleware, async (req,res)=>{
    try{
        const { title, assignedTo } = req.body;
        const task = await Task.create({ event: req.params.eventId, title, assignedTo });
        res.json(task);
    }catch(err){ res.status(500).json({ message: err.message }); }
});

// Update status
router.put('/:id', authMiddleware, async (req,res)=>{
    try{
        const task = await Task.findById(req.params.id);
        task.status = req.body.status;
        await task.save();
        res.json(task);
    }catch(err){ res.status(500).json({ message: err.message }); }
});

module.exports = router;
