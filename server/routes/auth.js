const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

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

module.exports = router;
