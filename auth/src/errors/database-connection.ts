import { AbstractError } from './base';
import type { ErrorItem } from './types';

export class DatabaseConnectionError extends AbstractError {
  reason = 'Error connecting to database';
  statusCode = 500;
  constructor() {
    super();
  }

  serlizeErrors(): ErrorItem[] {
    return [{ message: this.reason }];
  }
}
