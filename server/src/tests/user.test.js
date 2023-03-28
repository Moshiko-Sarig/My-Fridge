const request = require('supertest');
const server = require('../../app.js');

afterAll(() => {
  server.close(); // Close the server after the tests are done
});

describe('User registration', () => {
  it('should register a new user', async () => {
    const user = {
      email: 'test@example.com',
      password: 'password123',
      first_name: 'John',
      last_name: 'Doe',
      phone_number: '123-456-7890',
    };

    const response = await request(server)
      .post('http://localhost:4000/api/v1/register')
      .send(user);

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.user).toBeDefined();
  });
});
