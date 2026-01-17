import request from 'supertest';
import { app } from '../../app';
import { expect } from 'vitest';

it('Return a 201 on successfull singup ', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(201);
});

it('Returns 400 for invalid email', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test',
      password: 'password',
    })
    .expect(400);
});

it('Returns 400 for invalid password', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@gmail.com',
      password: 'pa',
    })
    .expect(400);
});

it('With missing email and password', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({ email: 'test@gmail.com' })
    .expect(400);

  await request(app)
    .post('/api/users/signup')
    .send({ password: 'password' })
    .expect(400);

  return request(app).post('/api/users/signup').send({}).expect(400);
});

it('Disalloed duplicate email', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({ email: 'test@gamil.com', password: 'password' })
    .expect(201);

  await request(app)
    .post('/api/users/signup')
    .send({ email: 'test@gamil.com', password: 'password' })
    .expect(400);
});

it('sets a cookie after successfull singup', async () => {
  const response = await request(app)
    .post('/api/users/signup')
    .send({ email: 'test@gamil.com', password: 'password' })
    .expect(201);

  expect(response.get('Set-Cookie')).toBeDefined();
});
