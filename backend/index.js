const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Import routes
const sessionRoutes = require('./routes/session');
const characterRoutes = require('./routes/character');

// Temporary storage for sessions (replace with database later)
let sessions = [];

// Use CORS middleware
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Session routes
app.use('/session', sessionRoutes);

// Character routes
app.use('/character', characterRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});