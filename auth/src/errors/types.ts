export interface ErrorItem {
  message: string;
  field?: string;
}

export type ReturnError = { errors: ErrorItem[] };

