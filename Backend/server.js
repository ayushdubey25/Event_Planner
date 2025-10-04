const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

// ✅ Correct CORS setup
app.use(cors({
  origin: "http://localhost:3000", // frontend origin
  credentials: true,               // allow cookies/auth headers
}));

app.use(express.json());

// Routes
const authRoutes = require("./routes/authRoutes");
const eventRoutes = require('./routes/event');

app.use("/api/auth", authRoutes);
app.use('/api/event', eventRoutes);

const PORT = process.env.PORT || 5800;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
