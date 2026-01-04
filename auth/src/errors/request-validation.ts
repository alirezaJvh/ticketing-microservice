import type { ValidationError } from 'express-validator';
import { AbstractError } from './base';
import { type ErrorItem } from './types';

export class RequestValidationError extends AbstractError {
  statusCode = 400;
  constructor(public errors: ValidationError[]) {
    super();
  }

  serlizeErrors(): ErrorItem[] {
    return this.errors.map((error) => ({
      message: `${error.msg}`,
      filed: error.type == 'field' ? error.path : error.type,
    }));
  }
}
