const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const eventRoutes = require('./routes/events');
const taskRoutes = require('./routes/tasks');

const app = express();
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/eventDB', { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>console.log('MongoDB connected'))
.catch(err=>console.log(err));

app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/tasks', taskRoutes);

const PORT = 5000;
app.listen(PORT, ()=>console.log(`Server running on port ${PORT}`));
