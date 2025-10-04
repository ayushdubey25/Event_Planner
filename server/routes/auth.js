const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const authMiddleware = require('../middleware/authMiddleware');


const JWT_SECRET = 'hackathonsecret';

// Register
router.post('/register', async (req,res)=>{
    const { name, email, password, role } = req.body;
    try{
        const exists = await User.findOne({ email });
        if(exists) return res.status(400).json({ message: 'User already exists' });
        const user = await User.create({ name, email, password, role });
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });
        res.json({ token, userId: user._id, role: user.role, name: user.name });
    } catch(err){ res.status(500).json({ message: err.message }); }
});

// Login
router.post('/login', async (req,res)=>{
    const { email, password } = req.body;
    try{
        const user = await User.findOne({ email });
        if(!user) return res.status(400).json({ message: 'User not found' });
        const isMatch = await user.matchPassword(password);
        if(!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });
        res.json({ token, userId: user._id, role: user.role, name: user.name });
    } catch(err){ res.status(500).json({ message: err.message }); }
});
// Get all users with role vendor
router.get('/vendors', authMiddleware, async (req, res) => {
    try {
        if (req.user.role !== 'organizer') return res.status(403).json({ message: 'Unauthorized' });
        const vendors = await User.find({ role: 'vendor' });
        res.json(vendors);
    } catch(err){ console.log(err); res.status(500).json({ message: 'Server error' }); }
});
router.get('/sponsors', authMiddleware, async (req, res) => {
  try {
    const sponsors = await User.find({ role: 'sponsor' }).select('name email');
    res.json(sponsors);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch sponsors' });
  }
});

module.exports = router;
