import mongoose from 'mongoose';
import { app } from './app';

const start = async () => {
  console.log(process.env.JWT_KEY);
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY is not defnied');
  }
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI is not defnied');
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to mongodb');
  } catch (err) {
    console.log(err);
  }

  app.listen(3000, () => {
    console.log('Listening on port 3000 !!!');
  });
};

start();
