import { type ErrorItem } from './types';

export abstract class AbstractError extends Error {
  abstract statusCode: number;
  constructor() {
    super();
    Object.setPrototypeOf(this, new.target.prototype);
  }
  abstract serlizeErrors(): ErrorItem[];
}
