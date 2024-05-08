// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../models/index.config');
const User = require('../models/user');

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Token not provided' });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    req.user = { userId: user._id }; // Set user ID in request for later use
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid token' });
  }
};

module.exports = {
  authenticateToken,
};
