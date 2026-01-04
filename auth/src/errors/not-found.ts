import { AbstractError } from './base';
import type { ErrorItem } from './types';

export class NotFoundError extends AbstractError {
  statusCode = 404;

  constructor() {
    super();
  }

  serlizeErrors(): ErrorItem[] {
    return [{ message: 'Not Found' }];
  }
}
