// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // Add other attributes as needed
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
