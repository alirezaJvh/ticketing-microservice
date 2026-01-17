import request from 'supertest';
import { app } from '../../app';
import { expect } from 'vitest';

it('Response with detail about the current user', async () => {
  const cookie = await global.signin();

  const respnse = await request(app)
    .get('/api/users/currentuser')
    .set('Cookie', cookie || [])
    .send()
    .expect(200);

  expect(respnse.body.currentUser.email).toEqual('test@gmail.com');
});

it('Response with null if not authenticated', async () => {
  const respnse = await request(app)
    .get('/api/users/currentuser')
    .send()
    .expect(401);
});
