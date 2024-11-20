const express = require('express');
const chatRoutes = require('./routes/chat'); // Import chat routes
const uploadRoutes = require('./routes/upload'); // Import upload routes

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use('/uploads', express.static('uploads')); // Serve files from uploads folder

// Routes
app.use('/api/chat', chatRoutes); // Chat routes mounted here
app.use('/api/upload', uploadRoutes); // File upload routes mounted here

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the PNG Chatbot Backend! The API is ready to use.');
});

// Catch-all for undefined routes
app.use((req, res) => {
  res.status(404).send({ error: 'Route not found. Please check your URL or API endpoint.' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

