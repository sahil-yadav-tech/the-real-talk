// packages/common/middlewares/requestLogger.js
import { logger } from '../logger/index.js';

/**
 * Logs all incoming requests and responses
 * Production-grade with performance tracking
 */
export const requestLogger = (req, res, next) => {
  const startTime = Date.now();
  
  // Store original end function to capture response
  const originalEnd = res.end;
  
  // Capture request details
  const requestInfo = {
    method: req.method,
    path: req.path,
    query: req.query,
    params: req.params,
    ip: req.ip,
    userAgent: req.get('user-agent'),
    referer: req.get('referer'),
    correlationId: req.correlationId,
    requestId: req.id,
    userId: req.user?._id || req.user?.id || 'unauthenticated',
    service: process.env.SERVICE_NAME || 'unknown',
  };

  // Log request (sanitize sensitive data)
  logger.info({
    ...requestInfo,
    message: `Incoming ${req.method} ${req.path}`,
    body: sanitizeRequestBody(req.body),
  });

  // Override end to log response
  res.end = function(chunk, encoding) {
    const duration = Date.now() - startTime;
    const responseInfo = {
      statusCode: res.statusCode,
      duration: `${duration}ms`,
      contentLength: res.get('content-length') || 'unknown',
      correlationId: req.correlationId,
    };

    // Log response (only if error or slow)
    if (res.statusCode >= 400) {
      logger.error({
        ...responseInfo,
        message: `Error response ${res.statusCode} for ${req.method} ${req.path}`,
      });
    } else if (duration > 1000) {
      // Log slow responses
      logger.warn({
        ...responseInfo,
        message: `Slow response (${duration}ms) for ${req.method} ${req.path}`,
      });
    } else {
      logger.info({
        ...responseInfo,
        message: `Completed ${req.method} ${req.path}`,
      });
    }

    // Call original end
    originalEnd.call(this, chunk, encoding);
  };

  next();
};

// Helper to sanitize request body
const sanitizeRequestBody = (body) => {
  if (!body || typeof body !== 'object') return body;
  
  const sanitized = { ...body };
  const sensitiveFields = ['password', 'confirmPassword', 'token', 'accessToken', 'refreshToken'];
  
  for (const field of sensitiveFields) {
    if (field in sanitized) {
      sanitized[field] = '[REDACTED]';
    }
  }
  
  return sanitized;
};