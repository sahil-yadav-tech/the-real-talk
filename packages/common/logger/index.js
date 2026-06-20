// packages/common/logger/index.js
import winston from 'winston';
import { loggerConfig } from './logger.config.js';

// Create the logger instance
const logger = winston.createLogger(loggerConfig);

// Add request context helper
export const createChildLogger = (context) => {
  return logger.child(context);
};

// Add correlation ID helper
export const withCorrelationId = (correlationId, fn) => {
  return logger.child({ correlationId });
};

// Export main logger
export { logger };

// Export default for convenience
export default logger;