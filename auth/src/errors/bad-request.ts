import { AbstractError } from './base';
import type { ErrorItem } from './types';

export class BadRequestError extends AbstractError {
  statusCode = 400;
  constructor(public readonly message: string) {
    super();
  }

  serlizeErrors(): ErrorItem[] {
    return [{ message: this.message }];
  }
}
