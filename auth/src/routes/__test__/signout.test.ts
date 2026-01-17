import request from 'supertest';
import { app } from '../../app';
import { expect } from 'vitest';

it('Clear the cookie after singing out', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@gamil.com',
      password: 'password',
    })
    .expect(201);

  const response = request(app).post('/api/users/signout').send({}).expect(200);

  expect(response.get('Set-Cookie')).toBeUndefined();
});
