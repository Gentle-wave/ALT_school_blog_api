// routes/blogRoutes.js
const express = require('express');
const router = express.Router();
const blogController = require('../controller/blogController');
const { createBlog, getBlogById, getUserBlogs, getBlogs, updateBlogststeAndContent, deleteBlog}= blogController;
const {authenticateToken}= require('../middleware/authMiddleware');

// Blog routes
router.post('/',authenticateToken, createBlog);
router.get('/', getBlogs);
router.get('/:id',authenticateToken, getBlogById);
router.put('/:id',authenticateToken, updateBlogststeAndContent);
router.delete('/:id',authenticateToken, deleteBlog);
router.get('/user',authenticateToken, getUserBlogs);

module.exports = router;
