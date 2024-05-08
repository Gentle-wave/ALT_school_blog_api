// tests/blog.test.js
const request = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');
const User = require('../models/user');

describe('Blog Endpoints', () => {
    let token;
  
    beforeAll(async () => {
      // Create a test user
      const user = await User.create({
        first_name: 'Test',
        last_name: 'User',
        email: 'test@example.com',
        password: 'password',
      });
  
      // Sign in the test user and get token
      const res = await request(app)
        .post('/auth/signin')
        .send({
          email: 'test@example.com',
          password: 'password',
        });
      token = res.body.token;
    }, 30000); 
  
    beforeEach(async () => {
      // Clear database before each test
      await Blog.deleteMany({});
    }, 30000); 
  
    it('should create a new blog', async () => {
      const res = await request(app)
        .post('/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send({
          title: 'Test Blog',
          description: 'This is a test blog',
          tags: ['test', 'example'],
          body: 'Lorem ipsum dolor sit amet',
        });
      expect(res.statusCode).toEqual(201);
      expect(res.body.blog).toHaveProperty('_id');
    }, 30000); 
  
    it('should get all blogs', async () => {
      await Blog.create({
        title: 'Test Blog 1',
        description: 'This is a test blog 1',
        tags: ['test', 'example'],
        body: 'Lorem ipsum dolor sit amet',
      });
      await Blog.create({
        title: 'Test Blog 2',
        description: 'This is a test blog 2',
        tags: ['test', 'example'],
        body: 'Lorem ipsum dolor sit amet',
      });
  
      const res = await request(app)
        .get('/blogs');
      expect(res.statusCode).toEqual(200);
      expect(res.body.blogs.length).toEqual(2);
    }, 30000); 
  
    // Add other test cases here with increased timeout values
  
  });
  