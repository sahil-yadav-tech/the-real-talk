// packages/common/middlewares/rateLimiter.js
import rateLimit from 'express-rate-limit';
import { TooManyRequestsError } from '../errors/index.js';

/**
 * Factory function to create rate limiters
 * Production-grade with configurable options
 */
export const createRateLimiter = (options = {}) => {
  const {
    windowMs = 15 * 60 * 1000, // 15 minutes
    max = 100,                 // 100 requests per window
    message = 'Too many requests, please try again later.',
    statusCode = 429,
    keyGenerator = (req) => {
      // Default key generator: IP + correlation ID
      return `${req.ip}-${req.correlationId || 'unknown'}`;
    },
    skip = (req) => {
      // Skip rate limiting for health checks
      return req.path === '/health' || req.path === '/healthz';
    },
    handler = (req, res, next) => {
      // Custom error handler for rate limit
      next(new TooManyRequestsError(message));
    },
    ...customOptions
  } = options;

  return rateLimit({
    windowMs,
    max,
    message: {
      success: false,
      message,
      errors: [{ field: 'rate_limit', message }],
    },
    statusCode,
    keyGenerator,
    skip,
    handler,
    standardHeaders: true, // Return RateLimit-* headers
    legacyHeaders: false,  // Disable X-RateLimit-* headers
    ...customOptions,
  });
};