const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const Event = require('../models/Event');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');
const multer = require('multer');

// --- Create Task (Organizer only) ---
router.post('/create', authMiddleware, async (req, res) => {
    try {
        const { title, description, eventId, vendorId, startTime, endTime } = req.body;

        // Check if vendor is busy (only if startTime and endTime are provided)
        if (vendorId && startTime && endTime) {
            const overlappingTasks = await Task.find({
                vendorId,
                startTime: { $ne: null },
                endTime: { $ne: null },
                $or: [
                    { startTime: { $lt: new Date(endTime), $gte: new Date(startTime) } },
                    { endTime: { $lte: new Date(endTime), $gt: new Date(startTime) } },
                    { startTime: { $lte: new Date(startTime) }, endTime: { $gte: new Date(endTime) } }
                ]
            });

            if (overlappingTasks.length > 0) {
                return res.status(400).json({ message: 'Vendor is busy during this time.' });
            }
        }

        const newTask = await Task.create({
            title,
            description,
            eventId,
            vendorId: vendorId || null,
            startTime: startTime ? new Date(startTime) : null,
            endTime: endTime ? new Date(endTime) : null,
            status: 'todo'
        });

        res.json(newTask);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Task creation failed' });
    }
});

// --- AI-Assisted Vendor Assignment ---
router.get('/suggest-vendor/:eventId', authMiddleware, async (req, res) => {
    try {
        const eventId = req.params.eventId;
        const allVendors = await User.find({ role: 'vendor' });

        const availableVendors = [];
        for (const v of allVendors) {
            const overlappingTasks = await Task.find({
                vendorId: v._id,
                startTime: { $ne: null },
                endTime: { $ne: null },
                status: { $in: ['todo', 'inprogress'] }
            });
            if (overlappingTasks.length === 0) availableVendors.push(v);
        }

        res.json(availableVendors[0] || null);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to suggest vendor' });
    }
});

// ✅ Get tasks for a vendor
router.get('/vendor', authMiddleware, async (req, res) => {
    try {
        const vendorId = req.user.id;
        const tasks = await Task.find({ vendorId })
            .populate('eventId', 'title venue date')
            .populate('vendorId', 'name email');

        res.status(200).json(tasks);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error while fetching vendor tasks' });
    }
});

// ✅ Get all tasks for an event
router.get('/:eventId', async (req, res) => {
    try {
        const tasks = await Task.find({ eventId: req.params.eventId })
            .populate('vendorId', 'name email')
            .populate('eventId', 'title date venue');
        res.json(tasks);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to fetch tasks' });
    }
});

// ✅ Update task status
router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const { status } = req.body;
        const task = await Task.findByIdAndUpdate(req.params.id, { status }, { new: true });
        res.json(task);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

// ✅ Upload document (Vendor uploads proof/invoice)
router.post('/:id/upload', authMiddleware, upload.single('file'), async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: 'Task not found' });
        if (task.vendorId.toString() !== req.user.id)
            return res.status(403).json({ message: 'Unauthorized' });

        task.document = req.file.filename;
        await task.save();

        res.json({ message: 'File uploaded successfully', task });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
