const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../models/index.config');

const signUp = async (req, res, next) => {
    try {
      const { first_name, last_name, email, password } = req.body;
      // Check if user with the same email already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
      // Create new user
      const newUser = new User({
        first_name,
        last_name,
        email,
        password: hashedPassword,
      });
      await newUser.save();
      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      next(error);
    }
  };
  
  const signIn = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      // Find user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      // Check password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid password' });
      }
      // Generate JWT token
      const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    } catch (error) {
      next(error);
    }
  };
  
  module.exports = {
    signUp,
    signIn,
  };
