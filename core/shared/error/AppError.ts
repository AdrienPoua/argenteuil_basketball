import { AppErrorType } from "./ErrorTypes";

export class AppError extends Error {
    public type: AppErrorType;
    public statusCode?: number;
    public originalError?: unknown;
    public details?: unknown;
  
    constructor({
      message,
      type,
      statusCode,
      originalError,
      details,
    }: {
      message: string;
      type: AppErrorType;
      statusCode?: number;
      originalError?: unknown;
      details?: unknown;
    }) {
      super(message);
      this.type = type;
      this.statusCode = statusCode;
      this.originalError = originalError;
      this.details = details;
      this.name = `AppError[${type}]`;
      Object.setPrototypeOf(this, new.target.prototype);
    }
  }