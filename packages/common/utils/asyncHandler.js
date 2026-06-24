// // packages/common/utils/asyncHandler.js
// import { logger } from '../logger/index.js';

// /**
//  * Wraps async controller functions with error handling
//  * Production-grade with correlation ID support
//  */
// export const asyncHandler = (fn) => {
//   return async (req, res, next) => {
//     try {
//       // Execute the controller function
//       const result = await fn(req, res, next);
//       return result;
//     } catch (error) {
//       // Prepare error context for logging
//       const errorContext = {
//         message: error.message,
//         stack: error.stack,
//         path: req.path,
//         method: req.method,
//         ip: req.ip,
//         userId: req.user?._id || req.user?.id || 'unauthenticated',
//         correlationId: req.correlationId || req.headers['x-correlation-id'],
//         requestId: req.id || req.headers['x-request-id'],
//         errorCode: error.errorCode || 'ERR_UNKNOWN',
//         statusCode: error.statusCode || 500,
//         userAgent: req.get('user-agent'),
//         referer: req.get('referer'),
//         query: req.query,
//         params: req.params,
//         // Don't log sensitive data, but log body structure for debugging
//         body: sanitizeRequestBody(req.body),
//       };

//       // Log the error
//       logger.error(errorContext);

//       // Pass to error handler middleware
//       next(error);
//     }
//   };
// };

// // Helper to sanitize request body (remove passwords, tokens, etc.)
// const sanitizeRequestBody = (body) => {
//   if (!body || typeof body !== 'object') return body;
  
//   const sanitized = { ...body };
//   const sensitiveFields = ['password', 'confirmPassword', 'token', 'accessToken', 'refreshToken', 'secret', 'apiKey'];
  
//   for (const field of sensitiveFields) {
//     if (field in sanitized) {
//       sanitized[field] = '[REDACTED]';
//     }
//   }
  
//   return sanitized;
// };




export const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next))
      .catch(next);
  };
};