import type { Request, Response, NextFunction } from 'express';
import { NotAuthrizedError } from '../errors/not-authorized';

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.currentUser) {
    throw new NotAuthrizedError();
  }

  next();
};
