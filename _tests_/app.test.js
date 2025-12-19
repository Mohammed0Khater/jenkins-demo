// tests/app.test.js
const request = require('supertest');
const app = require('../app.js');

describe('GET /', () => {
  it('should return the welcome message', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Hello from a Jenkins-built container!');
  });
});
