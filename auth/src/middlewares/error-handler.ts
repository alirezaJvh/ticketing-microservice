import type { Request, Response, NextFunction } from 'express';
import { AbstractError } from '../errors';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AbstractError) {
    return res.status(err.statusCode).send({ errors: err.serlizeErrors() });
  }

  return res.status(400).send({
    errors: [{ message: 'Something went wrong' }],
  });
};
