// auth-service/src/middlewares/auth.js
import jwt from 'jsonwebtoken';
import { logger } from '@your-org/common/logger/index.js';
import { User } from '../models/User.js';
import { config } from '../config/index.js';
import { ForbiddenError, UnauthorizedError } from '../../../../packages/common/errors/index.js';

/**
 * JWT Authentication middleware
 * Verifies token and attaches user to request
 */
export const authMiddleware = async (req, res, next) => {
  try {
    // Get token from Authorization header or cookie
    let token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      // Try cookie
      token = req.cookies?.access_token;
    }

    if (!token) {
      throw new UnauthorizedError('Authentication required');
    }

    // Verify token
    const decoded = jwt.verify(token, config.jwt.accessSecret);
    
    // Check if user exists
    const user = await User.findById(decoded.id).select('-password -__v');
    
    if (!user) {
      throw new UnauthorizedError('User not found');
    }

    // Check if user is active
    if (user.status === 'inactive') {
      throw new ForbiddenError('Account is inactive');
    }

    // Attach user to request
    req.user = user;
    req.userId = user._id;
    
    // Log authentication success
    logger.info({
      message: `User authenticated: ${user.email}`,
      userId: user._id,
      email: user.email,
      correlationId: req.correlationId,
    });

    next();
  } catch (error) {
    // Handle specific JWT errors
    if (error.name === 'JsonWebTokenError') {
      return next(new UnauthorizedError('Invalid token'));
    }
    if (error.name === 'TokenExpiredError') {
      return next(new UnauthorizedError('Token expired'));
    }
    next(error);
  }
};

/**
 * Role-based authorization middleware
 * @param {...string} roles - Allowed roles
 */
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new UnauthorizedError('Authentication required'));
    }

    if (!roles.includes(req.user.role)) {
      return next(new ForbiddenError('Insufficient permissions'));
    }

    next();
  };
};