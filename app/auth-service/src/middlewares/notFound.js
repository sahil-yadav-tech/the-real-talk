// auth-service/src/middlewares/notFound.js

import NotFoundError from "../../../../packages/common/errors/NotFoundError.js";
import logger from "../../../../packages/common/logger.js";




/**
 * 404 Not Found handler for Auth Service
 */
export const notFoundHandler = (req, res, next) => {
  const error = new NotFoundError(
    `Route ${req.method} ${req.originalUrl} not found in auth service`
  );
  
  // Log 404 for monitoring
  logger.warn({
    message: `Route not found: ${req.method} ${req.originalUrl}`,
    path: req.path,
    method: req.method,
    ip: req.ip,
    correlationId: req.correlationId,
    service: 'auth-service',
  });
  
  next(error);
};