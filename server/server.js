// server/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
require('dotenv').config();
const path = require('path');

const authRoutes = require('./routes/auth');
const eventRoutes = require('./routes/events');
const taskRoutes = require('./routes/tasks');
const sponsorRequestRoutes = require('./routes/sponsorRequests');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: { origin: '*' }
});

// Middleware
app.use(cors());
app.use(express.json());

// Serve tickets folder
app.use('/tickets', express.static(path.join(__dirname, 'tickets')));

// Socket.io for real-time updates
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  socket.on('taskUpdate', (data) => {
    io.emit('taskUpdate', data);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/sponsorRequests', sponsorRequestRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/tasks', taskRoutes);

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB error:', err));

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
