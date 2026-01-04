import { AbstractError } from './base';
import type { ErrorItem } from './types';

export class NotAuthrizedError extends AbstractError {
  statusCode = 401;

  constructor() {
    super();
  }

  serlizeErrors(): ErrorItem[] {
    return [{ message: 'Not Authorized' }];
  }
}
