// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');
const {signIn,signUp}= authController

// Authentication routes
router.post('/signup', signUp);
router.post('/signin', signIn);

module.exports = router;
