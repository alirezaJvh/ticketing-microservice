import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../app';
import jwt from 'jsonwebtoken';

declare global {
  var signin: () => Promise<string[] | undefined>;
}

let mongo: MongoMemoryServer;

beforeAll(async () => {
  process.env.JWT_KEY = 'YXNkZg==';
  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri, {});
});

beforeEach(async () => {
  const collections = await mongoose.connection.db?.collections();
  if (!collections) return;

  for (const collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  if (mongo) {
    await mongo.stop();
  }
  await mongoose.connection.close();
});

global.signin = async () => {
  const params = { id: '1', email: 'test@gmail.com' };

  const token = jwt.sign(params, process.env.JWT_KEY!);
  const session = { jwt: token };
  const sessionJson = JSON.stringify(session);
  const base64 = Buffer.from(sessionJson).toString('base64');

  return Promise.resolve([`session=${base64}`]);
};
