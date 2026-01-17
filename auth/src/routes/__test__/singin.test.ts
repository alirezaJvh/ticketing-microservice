import request from 'supertest';
import { app } from '../../app';
import { expect } from 'vitest';

it('Fail when an email does not exsit', async () => {
  return request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(400);
});

it('Fail when login with wrong password', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'correctPassword',
    })
    .expect(201);

  return request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: 'wrongPassword',
    })
    .expect(400);
});

it('Response with cookie when given valid credentiolas', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'correctPassword',
    })
    .expect(201);

  const response = await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: 'correctPassword',
    })
    .expect(200);

  expect(response.get('Set-Cookie')).toBeDefined();
});
