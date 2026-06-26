import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

import {
  createUser,
  findByEmail,
  findByPhone,
} from "../repositories/user.repository.js";
import redis from "../config/redis.config.js";
import { generateSimpleOtp } from "../../../../packages/common/utils/otpGenerator.js";
import { publishEvent } from "../events/producers/Producer.js";
import { BadRequestError } from "../../../../packages/common/errors/index.js";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../../../../packages/common/utils/jwt.js";

export const registerService = async (data) => {
  const { email, phoneNumber, password, firstName, lastName } = data;

  // Normalize email
  const normalizedEmail = email.toLowerCase().trim();

  // Check if user already exists in database
  const [existingUser, existingUserByPhone] = await Promise.all([
    findByEmail(normalizedEmail),
    findByPhone(phoneNumber),
  ]);

  console.log(existingUser, existingUserByPhone, "existingUser");

  if (existingUser) {
    throw new BadRequestError("User already exists with this email");
  }

  if (existingUserByPhone) {
    throw new BadRequestError("User already exists with this phone number");
  }

  // Check if registration is already in progress (Redis)
  const redisKey = `register:${normalizedEmail}`;
  const existingRegistrationData = await redis.get(redisKey);

  if (existingRegistrationData) {
    const parsedData = JSON.parse(existingRegistrationData);
    console.info(
      `Registration already in progress for email: ${normalizedEmail}`,
    );

    // Return existing OTP info without creating new one
    return {
      success: true,
      message: "OTP already sent. Please check your email.",
      data: {
        email: normalizedEmail,
        phoneNumber,
        otpSent: true,
        resendAvailable: true,
      },
    };
  }

  // Hash password
  const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS) || 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // Generate OTP
  const otp = generateSimpleOtp();
  const otpExpiryInSeconds = 300; // 5 minutes

  // Prepare registration data for Redis
  const registrationData = {
    firstName: firstName.trim(),
    lastName: lastName.trim(),
    email: normalizedEmail,
    phoneNumber: phoneNumber.trim(),
    password: hashedPassword,
    otp,
    createdAt: new Date().toISOString(),
  };

  // Store registration data in Redis
  try {
    await redis.set(
      redisKey,
      JSON.stringify(registrationData),
      "EX",
      otpExpiryInSeconds,
    );
    console.info(
      `Registration data stored in Redis for email: ${normalizedEmail}`,
    );
  } catch (error) {
    console.error("Failed to store registration data in Redis:", error);
    throw new Error("Failed to process registration. Please try again.");
  }

  // Publish event to RabbitMQ (non-blocking)
  try {
    await publishEvent("SEND_OTP", {
      email: normalizedEmail,
      otp,
      type: "REGISTER",
      firstName: firstName.trim(),
    });
    console.info(`OTP event published for email: ${normalizedEmail}`);
  } catch (error) {
    console.error("Failed to publish OTP event:", error);
    // Don't throw - registration can continue even if notification fails
    // But we should handle this gracefully
  }

  // Return success response (without sensitive data)
  return {
    success: true,
    message: "OTP sent successfully. Please check your email.",
    data: {
      email: normalizedEmail,
      phoneNumber: phoneNumber.trim(),
      otpSent: true,
      expiresIn: `${otpExpiryInSeconds / 60} minutes`,
    },
  };
};

export const verifyOtpService = async (data) => {
  const { email, otp } = data;

  const normalizedEmail = email.toLowerCase().trim();

  const redisKey = `register:${normalizedEmail}`;

  const existingData = await redis.get(redisKey);

  if (!existingData) {
    throw new BadRequestError("OTP expired");
  }

  const userData = JSON.parse(existingData);

  if (String(userData.otp) !== String(otp)) {
    throw new BadRequestError("Invalid OTP");
  }

  const user = await createUser({
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
    phoneNumber: userData.phoneNumber,
    password: userData.password,
  });

  await redis.del(redisKey);

  const response = user.toObject();

  delete response.password;

  return {
    message: "User created successfully",
    data: response,
  };
};

export const loginService = async (data) => {
  const { email, password } = data;

  const normalizedEmail = email.toLowerCase().trim();

  const user = await findByEmail(normalizedEmail, true);

  if (!user) {
    throw new BadRequestError("Invalid email or password");
  }

  const isPasswordMatched = await bcrypt.compare(password, user.password);

  if (!isPasswordMatched) {
    throw new BadRequestError("Invalid email or password");
  }

  const sessionId = crypto.randomUUID();

  const accessToken = generateAccessToken({
    userId: user._id,
    email: user.email,
    role: user.role,
  });

  const refreshToken = generateRefreshToken({
    userId: user._id,
    sessionId,
  });

  await redis.set(
    `refresh:${user._id}:${sessionId}`,
    refreshToken,
    "EX",
    7 * 24 * 60 * 60,
  );

  const userResponse = user.toObject();

  delete userResponse.password;

  return {
    user: userResponse,
    accessToken,
    refreshToken,
    sessionId,
  };
};

export const refreshTokenService = async (refreshToken, sessionId) => {
  if (!refreshToken) {
    throw new BadRequestError("Refresh token missing");
  }

  const decoded = verifyRefreshToken(refreshToken);

  const redisKey = `refresh:${decoded.userId}:${sessionId}`;

  console.log(redisKey, "redisKey");

  const storedToken = await redis.get(redisKey);

  console.log(storedToken, "storedToken");
  

  if (!storedToken || storedToken !== refreshToken) {
    throw new BadRequestError("Invalid session");
  }

  // Rotation

  await redis.del(redisKey);

  const newAccessToken = generateAccessToken({
    userId: decoded.userId,
  });

  const newRefreshToken = generateRefreshToken({
    userId: decoded.userId,
    sessionId,
  });

  await redis.set(redisKey, newRefreshToken, "EX", 7 * 24 * 60 * 60);

  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  };
};

export const logoutService = async (refreshToken, sessionId) => {
  const decoded = verifyRefreshToken(refreshToken);

  await redis.del(`refresh:${decoded.userId}:${sessionId}`);

  return true;
};

/*

// services/authService.js
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { BadRequestError } from '../errors/BadRequestError.js';
import { NotFoundError } from '../errors/NotFoundError.js';
import { UnauthorizedError } from '../errors/UnauthorizedError.js';
import { 
  findByEmail, 
  findById, 
  updateUser, 
  updatePassword, 
  updateLastLogin,
  incrementFailedAttempts,
  resetFailedAttempts,
  findUserByVerificationToken,
  findUserByResetToken,
  verifyUserEmail,
  clearResetToken
} from '../repositories/userRepository.js';
import { sendPasswordResetEmail, sendVerificationEmail } from '../utils/emailService.js';
import logger from '../utils/logger.js';

export const registerService = async (userData) => {
  const { email, phoneNumber, password, firstName, lastName } = userData;

  const normalizedEmail = email.toLowerCase().trim();

  const [existingUser, existingUserByPhone] = await Promise.all([
    findByEmail(normalizedEmail),
    findByPhone(phoneNumber)
  ]);

  if (existingUser) {
    throw new BadRequestError('User already exists with this email');
  }

  if (existingUserByPhone) {
    throw new BadRequestError('User already exists with this phone number');
  }

  const redisKey = `register:${normalizedEmail}`;
  const existingRegistration = await redis.get(redisKey);

  if (existingRegistration) {
    const parsedData = JSON.parse(existingRegistration);
    return {
      success: true,
      message: 'OTP already sent. Please check your email.',
      data: {
        email: normalizedEmail,
        phoneNumber: phoneNumber.trim(),
        otpSent: true,
        resendAvailable: true,
      },
    };
  }

  const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS) || 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  const registrationData = {
    firstName: firstName.trim(),
    lastName: lastName.trim(),
    email: normalizedEmail,
    phoneNumber: phoneNumber.trim(),
    password: hashedPassword,
    otp,
    createdAt: new Date().toISOString(),
  };

  await redis.set(
    redisKey,
    JSON.stringify(registrationData),
    'EX',
    300
  );

  return {
    success: true,
    message: 'OTP sent successfully. Please check your email.',
    data: {
      email: normalizedEmail,
      phoneNumber: phoneNumber.trim(),
      otpSent: true,
      expiresIn: '5 minutes',
    },
  };
};

export const loginService = async (credentials) => {
  const { email, password } = credentials;

  const user = await findByEmail(email, true);
  if (!user) {
    throw new UnauthorizedError('Invalid credentials');
  }

  if (user.isLocked && user.lockUntil > Date.now()) {
    throw new BadRequestError('Account is temporarily locked. Please try again later');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    await incrementFailedAttempts(user._id);
    throw new UnauthorizedError('Invalid credentials');
  }

  await resetFailedAttempts(user._id);

  if (!user.isEmailVerified) {
    await resendVerificationEmail(user);
    throw new BadRequestError('Please verify your email. A new verification link has been sent.');
  }

  const token = generateToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  await updateLastLogin(user._id);

  logger.info(`User logged in: ${email}`);

  return {
    user: sanitizeUser(user),
    token,
    refreshToken
  };
};

export const refreshTokenService = async (refreshToken) => {
  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const user = await findById(decoded.userId);

    if (!user) {
      throw new UnauthorizedError('Invalid refresh token');
    }

    const newToken = generateToken(user._id);
    const newRefreshToken = generateRefreshToken(user._id);

    return {
      user: sanitizeUser(user),
      token: newToken,
      refreshToken: newRefreshToken
    };
  } catch (error) {
    throw new UnauthorizedError('Invalid or expired refresh token');
  }
};

export const verifyEmailService = async (token) => {
  const user = await findUserByVerificationToken(token);

  if (!user) {
    throw new BadRequestError('Invalid verification token');
  }

  if (user.emailVerificationExpires < Date.now()) {
    throw new BadRequestError('Verification token has expired');
  }

  await verifyUserEmail(user._id);

  return { message: 'Email verified successfully' };
};

export const forgotPasswordService = async (email) => {
  const user = await findByEmail(email);

  if (!user) {
    return { message: 'If an account exists, a reset link will be sent' };
  }

  const resetToken = generateResetToken();
  const resetExpires = Date.now() + 3600000;

  await updateUser(user._id, {
    resetPasswordToken: resetToken,
    resetPasswordExpires: resetExpires
  });

  sendPasswordResetEmail(user.email, resetToken).catch(err => {
    logger.error(`Failed to send reset email: ${err.message}`);
  });

  return { message: 'Password reset link sent to your email' };
};

export const resetPasswordService = async (token, newPassword) => {
  const user = await findUserByResetToken(token);

  if (!user) {
    throw new BadRequestError('Invalid reset token');
  }

  if (user.resetPasswordExpires < Date.now()) {
    throw new BadRequestError('Reset token has expired');
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await updatePassword(user._id, hashedPassword);
  await clearResetToken(user._id);

  return { message: 'Password reset successfully' };
};

export const changePasswordService = async (userId, currentPassword, newPassword) => {
  const user = await findById(userId, true);

  if (!user) {
    throw new NotFoundError('User not found');
  }

  const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
  if (!isPasswordValid) {
    throw new BadRequestError('Current password is incorrect');
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await updatePassword(userId, hashedPassword);

  logger.info(`Password changed for user: ${user.email}`);

  return { message: 'Password changed successfully' };
};

export const generateToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
};

export const generateRefreshToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET,
    { expiresIn: '30d' }
  );
};

export const generateVerificationToken = () => {
  return crypto.randomBytes(32).toString('hex');
};

export const generateResetToken = () => {
  return crypto.randomBytes(32).toString('hex');
};

export const sanitizeUser = (user) => {
  const userObj = user.toObject ? user.toObject() : { ...user };
  const { 
    password, 
    __v, 
    resetPasswordToken, 
    resetPasswordExpires, 
    emailVerificationToken, 
    emailVerificationExpires,
    ...sanitized 
  } = userObj;
  return sanitized;
};
*/
