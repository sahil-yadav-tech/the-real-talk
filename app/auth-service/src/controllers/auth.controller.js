// app/backend/src/controllers/auth.controller.js

import { registerService, loginService, logoutService, refreshTokenService } from '../services/auth.service.js';
import asyncHandler from '../../../../packages/common/utils/asyncHandler.js';
import { logger } from '../../../../packages/common/logger/index.js';
import { 
  BadRequestError, 
  NotFoundError, 
  UnauthorizedError 
} from '../../../../packages/common/errors/index.js';
import { validateRegister, validateLogin } from '../../../../packages/common/validators/auth.validator.js';

/**
 * Register a new user
 * Flow: Validate → Check existence → Hash password → Create user → Generate token
 */
export const register = asyncHandler(async (req, res) => {
  // Validate request body
  const { error, value } = validateRegister(req.body);
  if (error) {
    throw new BadRequestError(error.details[0].message);
  }

  // Call service
  const { user, token } = await registerService(value);

  // Set cookie
  setAuthCookie(res, token);

  // Log success
  logger.info(`User registered successfully: ${user.email}`);

  return res.status(201).json({
    success: true,
    message: 'User registered successfully',
    data: { user, token }
  });
});

/**
 * Login user
 * Flow: Validate → Find user → Verify password → Generate token → Set cookie
 */
export const login = asyncHandler(async (req, res) => {
  // Validate request body
  const { error, value } = validateLogin(req.body);
  if (error) {
    throw new BadRequestError(error.details[0].message);
  }

  // Call service
  const { user, token } = await loginService(value);

  // Set cookie
  setAuthCookie(res, token);

  // Update last login
  await updateLastLogin(user._id);

  // Log success
  logger.info(`User logged in: ${user.email}`);

  return res.status(200).json({
    success: true,
    message: 'Login successful',
    data: { user, token }
  });
});

/**
 * Logout user
 * Flow: Clear cookie → Blacklist token (optional)
 */
export const logout = asyncHandler(async (req, res) => {
  // Clear cookie
  res.clearCookie('user_token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  });

  // Optional: Add token to blacklist
  // await blacklistToken(req.token);

  logger.info(`User logged out: ${req.user?.email || 'unknown'}`);

  return res.status(200).json({
    success: true,
    message: 'Logged out successfully'
  });
});

/**
 * Refresh token
 * Flow: Verify refresh token → Generate new access token
 */
export const refreshToken = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body;
  
  if (!refreshToken) {
    throw new BadRequestError('Refresh token required');
  }

  const { user, token } = await refreshTokenService(refreshToken);

  setAuthCookie(res, token);

  return res.status(200).json({
    success: true,
    message: 'Token refreshed successfully',
    data: { user, token }
  });
});

/**
 * Get current user profile
 */
export const getProfile = asyncHandler(async (req, res) => {
  const user = await getUserById(req.user._id);
  
  if (!user) {
    throw new NotFoundError('User not found');
  }

  return res.status(200).json({
    success: true,
    data: { user }
  });
});

/**
 * Update user profile
 */
export const updateProfile = asyncHandler(async (req, res) => {
  const { firstName, lastName, preferences } = req.body;
  
  const updatedUser = await updateUserService(req.user._id, {
    firstName,
    lastName,
    preferences
  });

  return res.status(200).json({
    success: true,
    message: 'Profile updated successfully',
    data: { user: updatedUser }
  });
});

/**
 * Change password
 */
export const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  
  await changePasswordService(req.user._id, currentPassword, newPassword);

  return res.status(200).json({
    success: true,
    message: 'Password changed successfully'
  });
});

/**
 * Set auth cookie helper
 */
const setAuthCookie = (res, token) => {
  const isProduction = process.env.NODE_ENV === 'production';
  const cookieOptions = {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    path: '/'
  };

  // In production, set domain if needed
  if (isProduction && process.env.COOKIE_DOMAIN) {
    cookieOptions.domain = process.env.COOKIE_DOMAIN;
  }

  res.cookie('user_token', token, cookieOptions);
};