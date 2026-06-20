// auth-service/src/middlewares/errorHandler.js
import logger from "../../../../packages/common/logger/index.js";
// import {
//   errorResponse,
//   // BadRequestError,
//   UnauthorizedError,
//   ForbiddenError,
//   NotFoundError,
//   ValidationError,
//   // ConflictError,
//   InternalServerError,
// } from"../../../../packages/common/response/sendResponse.js";

// import errorResponse from"../../../../packages/common/response/sendResponse.js";

/**
 * Global error handler for Auth Service
 * Production-grade with service-specific logic
 */
export const errorHandler = (err, req, res, next) => {
  // Default values
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal server error';
  let errorCode = err.errorCode || 'ERR_INTERNAL';
  let errors = err.errors || null;

  // Handle specific error types
  // 1. JWT Errors
  if (err.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Invalid authentication token';
    errorCode = 'ERR_JWT_INVALID';
  }

  if (err.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Authentication token has expired';
    errorCode = 'ERR_JWT_EXPIRED';
  }

  // 2. Database Errors
  if (err.name === 'MongoServerError') {
    if (err.code === 11000) {
      // Duplicate key error
      statusCode = 409;
      const field = Object.keys(err.keyPattern)[0];
      message = `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`;
      errorCode = 'ERR_DUPLICATE';
      errors = [{ field, message: `${field} is already taken` }];
    }
  }

  // 3. Validation Errors
  if (err.name === 'ValidationError') {
    statusCode = 422;
    message = 'Validation failed';
    errorCode = 'ERR_VALIDATION';
    errors = Object.values(err.errors).map(e => ({
      field: e.path,
      message: e.message,
      value: e.value,
    }));
  }

  // 4. Mongoose Cast Errors
  if (err.name === 'CastError') {
    statusCode = 400;
    message = `Invalid ${err.path}: ${err.value}`;
    errorCode = 'ERR_INVALID_ID';
    errors = [{ field: err.path, message: `Invalid value for ${err.path}` }];
  }

  // 5. Auth-specific custom errors
  if (err.message === 'Invalid credentials') {
    statusCode = 401;
    message = 'Invalid email or password';
    errorCode = 'ERR_INVALID_CREDENTIALS';
  }

  // 6. Don't expose internal error details in production
  if (statusCode === 500 && process.env.NODE_ENV === 'production') {
    message = 'Something went wrong. Please try again later.';
    errors = null;
  }

  // Create error response
  const errorResponseObj = {
    success: false,
    message,
    errorCode,
    errors,
    statusCode,
    timestamp: new Date().toISOString(),
    path: req.path,
    method: req.method,
    correlationId: req.correlationId,
    service: 'auth-service',
  };

  // Log error with full context
  logger.error({
    ...errorResponseObj,
    stack: err.stack,
    ip: req.ip,
    userId: req.user?._id || 'unauthenticated',
    userAgent: req.get('user-agent'),
    body: req.body,
    query: req.query,
    params: req.params,
  });

  // Send response
  return errorResponse(res, message, statusCode, errors, {
    errorCode,
    path: req.path,
    correlationId: req.correlationId,
  });
};