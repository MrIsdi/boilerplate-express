const request = require('supertest');
const app = require('../src/app');
const sequelize = require('../src/database/connection');
const User = require('../src/models/User');

describe('Auth API', () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true }); // Clear and re-sync database before each test
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/v1/auth/register')
      .send({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('message', 'User registered successfully');
    expect(res.body.user).toHaveProperty('email', 'test@example.com');
  });

  it('should not register a user with existing email', async () => {
    await request(app)
      .post('/api/v1/auth/register')
      .send({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
      });

    const res = await request(app)
      .post('/api/v1/auth/register')
      .send({
        username: 'anotheruser',
        email: 'test@example.com',
        password: 'password456',
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual('User with that email already exists.');
  });

  it('should login an existing user and return a token', async () => {
    await request(app)
      .post('/api/v1/auth/register')
      .send({
        username: 'loginuser',
        email: 'login@example.com',
        password: 'loginpassword',
      });

    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'login@example.com',
        password: 'loginpassword',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });

  it('should not login with invalid credentials', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'nonexistent@example.com',
        password: 'wrongpassword',
      });
    expect(res.statusCode).toEqual(401);
    expect(res.body.message).toEqual('Invalid credentials.');
  });
});
