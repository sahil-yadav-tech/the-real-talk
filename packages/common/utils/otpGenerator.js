// utils/otpGenerator.js
import crypto from 'crypto';

/**
 * Generates a secure 6-digit OTP
 * @param {number} length - Length of OTP (default: 6)
 * @returns {string} OTP as string
 */
export const generateOtp = (length = 6) => {
  // Using crypto for secure random number generation
  const min = Math.pow(10, length - 1);
  const max = Math.pow(10, length) - 1;
  const range = max - min + 1;
  const bytes = crypto.randomBytes(Math.ceil(Math.log2(range) / 8));
  const randomNumber = parseInt(bytes.toString('hex'), 16) % range + min;
  return randomNumber.toString().padStart(length, '0');
};

/**
 * Generates OTP using Math.random (less secure but faster)
 * Use only for non-critical applications
 */
export const generateSimpleOtp = (length = 6) => {
  return Math.floor(
    Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1)
  ).toString();
};