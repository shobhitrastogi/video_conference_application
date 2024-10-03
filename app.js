const express = require('express');
const http = require('http');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const callRoutes = require('./routes/callRoutes');
const cors = require('cors');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
// Connect to database
connectDB();

// Middleware

app.use(cors({
    origin: 'http://localhost:3000', // Allow only your frontend URL
    credentials: true // Enable set of cookies
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/call', callRoutes);
// Initialize signaling for WebRTC
const initSignaling = require('./utils/signaling');
initSignaling(server);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
