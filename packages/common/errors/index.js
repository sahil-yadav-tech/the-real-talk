// packages/common/errors/index.js
export { AppError } from './AppError.js';

// 4xx Client Errors
export class BadRequestError extends AppError {
  constructor(message = 'Bad Request', errorCode = 'ERR_BAD_REQUEST') {
    super(message, 400, true, errorCode);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized', errorCode = 'ERR_UNAUTHORIZED') {
    super(message, 401, true, errorCode);
  }
}

export class ForbiddenError extends AppError {
  constructor(message = 'Forbidden', errorCode = 'ERR_FORBIDDEN') {
    super(message, 403, true, errorCode);
  }
}

export class NotFoundError extends AppError {
  constructor(message = 'Resource not found', errorCode = 'ERR_NOT_FOUND') {
    super(message, 404, true, errorCode);
  }
}

export class ValidationError extends AppError {
  constructor(message = 'Validation failed', errors = null, errorCode = 'ERR_VALIDATION') {
    super(message, 422, true, errorCode);
    this.errors = errors;
  }
}

export class ConflictError extends AppError {
  constructor(message = 'Resource already exists', errorCode = 'ERR_CONFLICT') {
    super(message, 409, true, errorCode);
  }
}

export class TooManyRequestsError extends AppError {
  constructor(message = 'Too many requests', errorCode = 'ERR_RATE_LIMIT') {
    super(message, 429, true, errorCode);
  }
}

// 5xx Server Errors
export class InternalServerError extends AppError {
  constructor(message = 'Internal server error', errorCode = 'ERR_INTERNAL') {
    super(message, 500, false, errorCode);
  }
}

export class ServiceUnavailableError extends AppError {
  constructor(message = 'Service temporarily unavailable', errorCode = 'ERR_SERVICE_UNAVAILABLE') {
    super(message, 503, false, errorCode);
  }
}