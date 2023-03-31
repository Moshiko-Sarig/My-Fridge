const request = require('supertest');
const server = require('../../app.js');

afterAll(() => {
  server.close(); 
});

describe('User registration', () => {
  it('should register a new user', async () => {
    const user = {
      email: 'test123@gmail.com',
      password: 'test123',
      first_name: 'app',
      last_name: 'app',
      phone_number: '12345678',
    };

    const response = await request(server)
      .post('/api/v1/register')
      .send(user);

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.user).toBeDefined();
  });
});

describe('User login', () => {
  it('should log in a user', async () => {
    const credentials = {
      email: 'moshikosarig1@gmail.com',
      password: 'moshiko123',
    };

    const response = await request(server)
      .post('/api/v1/user/login')
      .send(credentials);

    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
  });

  it('should fail with incorrect password', async () => {
    const credentials = {
      email: 'moshikosarig1@gmail.com',
      password: 'wrong_password',
    };

    const response = await request(server)
      .post('/api/v1/user/login')
      .send(credentials);

    expect(response.status).toBe(401);
    expect(response.body).toBe('Incorrect username or password.');
  });

  it('should fail with non-existent email', async () => {
    const credentials = {
      email: 'nonexistent@gmail.com',
      password: 'moshiko123',
    };

    const response = await request(server)
      .post('/api/v1/user/login')
      .send(credentials);

    expect(response.status).toBe(401);
    expect(response.body).toBe('Incorrect email or password.');
  });
});
