// app.js
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const { PORT, MONGODB_URI } = require('./models/index.config');

const app = express();

// Middleware
app.use(express.json());
app.use(morgan('combined')); // or use winston logger here
// Add other middleware as needed

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Blogging API!' });
});
app.use('/auth', require('./routes/authRoutes'));
app.use('/blogs', require('./routes/blogRoutes'));

// Error handling middleware
app.use((err, req, res, next) => {
  // 1. Log the error details
  console.error(err.stack); // Log error message and stack trace

  // 2. Set appropriate status code based on error type
  let statusCode = 500; // Internal Server Error (default)
  if (err.status) {
    statusCode = err.status; // Use status code from the error object if available
  }

  // 3. Prepare a user-friendly error message
  let errorMessage = "Internal Server Error"; // Default message
  if (process.env.NODE_ENV !== 'production') {
    // Include more details in development environment
    errorMessage = err.message;
  }

  // 4. Send the error response
  res.status(statusCode).json({ message: errorMessage });
});


// Connect to MongoDB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB', err);
  });
