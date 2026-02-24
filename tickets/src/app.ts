import express from 'express';

import { errorHandler, NotFoundError, currentUser } from '@alirezajvh/common';
import cookieSession from 'cookie-session';
import { router } from './routes';

const app = express();
app.set('trust proxy', true);
app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
  }),
);
app.use(currentUser);

app.use(router);

app.use(() => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
