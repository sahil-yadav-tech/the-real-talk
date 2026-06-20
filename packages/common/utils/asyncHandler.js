// packages/common/utils/asyncHandler.js

/**
 * Async handler to eliminate try-catch blocks in controllers
 * Wraps async route handlers and passes errors to Express error middleware
 * 
 * @param {Function} fn - Async function to wrap
 * @returns {Function} Express middleware function
 * 
 * @example
 * router.post('/register', asyncHandler(registerController));
 */
const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export default asyncHandler;