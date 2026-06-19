// // app/backend/src/services/auth.service.js

import BadRequestError from "../../../../packages/common/errors/BadRequestError.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

import {
  findByEmail,
  // createUser,
  // findById,
  // updateUser,
  // updatePassword,
  // updateLastLogin
} from "../repositories/user.repository.js";
// import BadRequestError from '../../../../packages/common/errors/BadRequestError.js';

export const registerService = async (userData) => {
  const { email, password, firstName, lastName } = userData;

  // Check if user exists
  const existingUser = await findByEmail(email);
  console.log(existingUser, "existingUser ");

  if (existingUser) {
    throw new BadRequestError("User already exists with this email");
  }

  // Hash password
  const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  console.log(saltRounds, hashedPassword);

  process.exit();

  //   // Create user
  //   const user = await createUser({
  //     firstName,
  //     lastName,
  //     email: email.toLowerCase(),
  //     password: hashedPassword,
  //     emailVerificationToken: generateVerificationToken(),
  //     emailVerificationExpires: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
  //   });

  //   // Generate token
  //   const token = generateToken(user._id);

  //   // Generate refresh token
  //   const refreshToken = generateRefreshToken(user._id);

  //   // Send verification email (async - don't await)
  //   sendVerificationEmail(user.email, user.emailVerificationToken).catch(err => {
  //     // logger.error(`Failed to send verification email: ${err.message}`);
  //   });

  // //   logger.info(`User registered: ${email}`);

  //   return {
  //     user: sanitizeUser(user),
  //     token,
  //     refreshToken
  //   };
};

// /**
//  * Register new user service
//  */

// // /**
// //  * Login user service
// //  */
// // export const loginService = async (credentials) => {
// //   const { email, password } = credentials;

// //   // Find user with password
// //   const user = await findByEmail(email, true);
// //   if (!user) {
// //     throw new UnauthorizedError('Invalid credentials');
// //   }

// //   // Check if account is locked
// //   if (user.isLocked && user.lockUntil > Date.now()) {
// //     throw new BadRequestError('Account is temporarily locked. Please try again later');
// //   }

// //   // Verify password
// //   const isPasswordValid = await bcrypt.compare(password, user.password);
// //   if (!isPasswordValid) {
// //     // Increment failed login attempts
// //     await incrementFailedAttempts(user._id);
// //     throw new UnauthorizedError('Invalid credentials');
// //   }

// //   // Reset failed attempts on successful login
// //   await resetFailedAttempts(user._id);

// //   // Check if email is verified
// //   if (!user.isEmailVerified) {
// //     // Resend verification email
// //     await resendVerificationEmail(user);
// //     throw new BadRequestError('Please verify your email. A new verification link has been sent.');
// //   }

// //   // Generate tokens
// //   const token = generateToken(user._id);
// //   const refreshToken = generateRefreshToken(user._id);

// //   // Update last login
// //   await updateLastLogin(user._id);

// // //   logger.info(`User logged in: ${email}`);

// //   return {
// //     user: sanitizeUser(user),
// //     token,
// //     refreshToken
// //   };
// // };

// // /**
// //  * Refresh token service
// //  */
// // export const refreshTokenService = async (refreshToken) => {
// //   try {
// //     const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
// //     const user = await findById(decoded.userId);

// //     if (!user) {
// //       throw new UnauthorizedError('Invalid refresh token');
// //     }

// //     const newToken = generateToken(user._id);
// //     const newRefreshToken = generateRefreshToken(user._id);

// //     return {
// //       user: sanitizeUser(user),
// //       token: newToken,
// //       refreshToken: newRefreshToken
// //     };
// //   } catch (error) {
// //     throw new UnauthorizedError('Invalid or expired refresh token');
// //   }
// // };

// // /**
// //  * Verify email service
// //  */
// // export const verifyEmailService = async (token) => {
// //   const user = await findUserByVerificationToken(token);

// //   if (!user) {
// //     throw new BadRequestError('Invalid verification token');
// //   }

// //   if (user.emailVerificationExpires < Date.now()) {
// //     throw new BadRequestError('Verification token has expired');
// //   }

// //   await verifyUserEmail(user._id);

// //   return { message: 'Email verified successfully' };
// // };

// // /**
// //  * Forgot password service
// //  */
// // export const forgotPasswordService = async (email) => {
// //   const user = await findByEmail(email);

// //   if (!user) {
// //     // Don't reveal if email exists or not (security)
// //     return { message: 'If an account exists, a reset link will be sent' };
// //   }

// //   const resetToken = generateResetToken();
// //   const resetExpires = Date.now() + 3600000; // 1 hour

// //   await updateUser(user._id, {
// //     resetPasswordToken: resetToken,
// //     resetPasswordExpires: resetExpires
// //   });

// //   // Send reset email (async)
// //   sendPasswordResetEmail(user.email, resetToken).catch(err => {
// //     // logger.error(`Failed to send reset email: ${err.message}`);
// //   });

// //   return { message: 'Password reset link sent to your email' };
// // };

// // /**
// //  * Reset password service
// //  */
// // export const resetPasswordService = async (token, newPassword) => {
// //   const user = await findUserByResetToken(token);

// //   if (!user) {
// //     throw new BadRequestError('Invalid reset token');
// //   }

// //   if (user.resetPasswordExpires < Date.now()) {
// //     throw new BadRequestError('Reset token has expired');
// //   }

// //   const hashedPassword = await bcrypt.hash(newPassword, 10);

// //   await updatePassword(user._id, hashedPassword);
// //   await clearResetToken(user._id);

// //   return { message: 'Password reset successfully' };
// // };

// // /**
// //  * Change password service
// //  */
// // export const changePasswordService = async (userId, currentPassword, newPassword) => {
// //   const user = await findById(userId, true);

// //   if (!user) {
// //     throw new NotFoundError('User not found');
// //   }

// //   const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
// //   if (!isPasswordValid) {
// //     throw new BadRequestError('Current password is incorrect');
// //   }

// //   const hashedPassword = await bcrypt.hash(newPassword, 10);
// //   await updatePassword(userId, hashedPassword);

// // //   logger.info(`Password changed for user: ${user.email}`);

// //   return { message: 'Password changed successfully' };
// // };

// // /**
// //  * Generate JWT token
// //  */
// // export const generateToken = (userId) => {
// //   return jwt.sign(
// //     { userId },
// //     process.env.JWT_SECRET,
// //     { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
// //   );
// // };

// // /**
// //  * Generate refresh token
// //  */
// // export const generateRefreshToken = (userId) => {
// //   return jwt.sign(
// //     { userId },
// //     process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET,
// //     { expiresIn: '30d' }
// //   );
// // };

// // /**
// //  * Generate verification token
// //  */
// // export const generateVerificationToken = () => {
// //   return crypto.randomBytes(32).toString('hex');
// // };

// // /**
// //  * Generate reset token
// //  */
// // export const generateResetToken = () => {
// //   return crypto.randomBytes(32).toString('hex');
// // };

// // /**
// //  * Sanitize user object (remove sensitive data)
// //  */
// // export const sanitizeUser = (user) => {
// //   const userObj = user.toObject ? user.toObject() : { ...user };
// //   const { password, __v, resetPasswordToken, resetPasswordExpires, emailVerificationToken, emailVerificationExpires, ...sanitized } = userObj;
// //   return sanitized;
// // };
