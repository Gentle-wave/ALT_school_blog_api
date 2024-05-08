// models/Blog.js
const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  tags: { type: [String], default: [] },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  state: { type: String, enum: ['draft', 'published'], default: 'draft' },
  read_count: { type: Number, default: 0 },
  reading_time: { type: Number, default: 0 },
  body: { type: String, required: true },
}, { timestamps: true });

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
