import request from 'supertest';
import { app } from '../../app';
import { expect } from 'vitest';

it('route handler for post request', async () => {
  const response = await request(app).post('/api/tickets').send({});

  expect(response.status).not.toEqual(404);
});
it('acessable only if user is singed in', async () => {
  const response = await request(app).post('/api/tickets').send({}).expect(401);

  //   expect(response.status).toEqual(401);
});
it('return correct status when user is signed in', async () => {
  const cookie = await global.signin();
  expect(cookie).toBeDefined();
  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie || [])
    .send({});

  expect(response.status).toEqual(200);
});

it('title validation ', async () => {});
it('price validation', async () => {});
it('create tickets with valida parameters', async () => {});
