
const request = require('supertest');
const app = require('../app');
const User = require('../models/user');

describe('Authentication Endpoints', () => {
    let token;
  
    beforeAll(async () => {
      // Create a test user
      await User.create({
        first_name: 'Test',
        last_name: 'User',
        email: 'test@example.com',
        password: 'password',
      });
    }, 30000); 
  
    it('should sign up a new user', async () => {
      const res = await request(app)
        .post('/auth/signup')
        .send({
          first_name: 'John',
          last_name: 'Doe',
          email: 'john@example.com',
          password: 'password',
        });
      expect(res.statusCode).toEqual(201);
    }, 30000); 
  
    it('should sign in an existing user', async () => {
      const res = await request(app)
        .post('/auth/signin')
        .send({
          email: 'test@example.com',
          password: 'password',
        });
      expect(res.statusCode).toEqual(200);
      token = res.body.token;
    }, 30000); 
  
    it('should fail to sign in with invalid credentials', async () => {
      const res = await request(app)
        .post('/auth/signin')
        .send({
          email: 'test@example.com',
          password: 'wrongpassword',
        });
      expect(res.statusCode).toEqual(401);
    }, 30000); 
  
    it('should fail to access protected route without token', async () => {
      const res = await request(app)
        .get('/blogs/user');
      expect(res.statusCode).toEqual(401);
    }, 30000); 
  
    it('should access protected route with token', async () => {
      const res = await request(app)
        .get('/blogs/user')
        .set('Authorization', `Bearer ${token}`);
      expect(res.statusCode).toEqual(200);
    }, 30000);
  });
  
