// packages/common/middlewares/correlationId.js
import { v4 as uuidv4 } from 'uuid';

/**
 * Adds correlation ID to every request for tracking across services
 * Production-grade with fallback generation
 */
export const correlationId = (options = {}) => {
  const {
    headerName = 'x-correlation-id',
    generateOnMissing = true,
    setResponseHeader = true,
  } = options;

  return (req, res, next) => {
    // Get correlation ID from headers or generate new one
    let correlationId = req.headers[headerName.toLowerCase()];
    
    if (!correlationId && generateOnMissing) {
      correlationId = uuidv4();
    }

    // Store in request object
    req.correlationId = correlationId;
    req.id = correlationId; // For express-request-id compatibility

    // Set in response headers for client-side tracking
    if (setResponseHeader && correlationId) {
      res.setHeader(headerName, correlationId);
    }

    // Also store in response locals for view engines (if used)
    res.locals.correlationId = correlationId;

    next();
  };
};