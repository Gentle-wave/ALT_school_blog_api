// controllers/blogController.js
const Blog = require('../models/blog');
const User = require('../models/user');

const createBlog = async (req, res, next) => {
    try {
      const { title, description, tags, body } = req.body;
      const userId = req.user.userId; // Extracted from JWT token in middleware
      // Create new blog
      const newBlog = new Blog({
        title,
        description,
        tags,
        author: userId,
        body,
      });
      await newBlog.save();
      res.status(201).json({ message: 'Blog created successfully', blog: newBlog });
    } catch (error) {
      next(error);
    }
  };
  
  const getBlogs = async (req, res, next) => {
    try {
      const { page = 1, limit = 20, state, author, title, tags, orderBy } = req.query;
      const query = {};
      if (state) query.state = state;
      if (author) query.author = author;
      if (title) query.title = { $regex: title, $options: 'i' };
      if (tags) query.tags = { $in: tags.split(',') };
      const sortOptions = {};
      if (orderBy) sortOptions[orderBy] = 1; // You can adjust the sorting order as needed
      const blogs = await Blog.find(query)
        .populate('author', 'first_name last_name email') // Populate author info
        .sort(sortOptions)
        .skip((page - 1) * limit)
        .limit(limit);
      res.json({ blogs });
    } catch (error) {
      next(error);
    }
  };
  
  const getBlogById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const blog = await Blog.findById(id).populate('author', 'first_name last_name email');
      if (!blog) {
        return res.status(404).json({ message: 'Blog not found' });
      }
      // Increment read count
      blog.read_count += 1;
      await blog.save();
      res.json({ blog });
    } catch (error) {
      next(error);
    }
  };
  
  const updateBlogststeAndContent = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { title, description, tags, body, state } = req.body;
      const blog = await Blog.findByIdAndUpdate(id, {
        title,
        description,
        tags,
        body,
        state,
      }, { new: true });
      if (!blog) {
        return res.status(404).json({ message: 'Blog not found' });
      }
      res.json({ message: 'Blog updated successfully', blog });
    } catch (error) {
      next(error);
    }
  };
  
  const deleteBlog = async (req, res, next) => {
    try {
      const { id } = req.params;
      const blog = await Blog.findByIdAndDelete(id);
      if (!blog) {
        return res.status(404).json({ message: 'Blog not found' });
      }
      res.json({ message: 'Blog deleted successfully' });
    } catch (error) {
      next(error);
    }
  };
  
  const getUserBlogs = async (req, res, next) => {
    try {
      const userId = req.user.userId; // Extracted from JWT token in middleware
      const { page = 1, limit = 20 } = req.query;
      const blogs = await Blog.find({ author: userId })
        .populate('author', 'first_name last_name email') // Populate author info
        .skip((page - 1) * limit)
        .limit(limit);
      res.json({ blogs });
    } catch (error) {
      next(error);
    }
  };
  
  module.exports = {
    createBlog,
    getBlogs,
    getBlogById,
    updateBlogststeAndContent,
    deleteBlog,
    getUserBlogs,
  };
