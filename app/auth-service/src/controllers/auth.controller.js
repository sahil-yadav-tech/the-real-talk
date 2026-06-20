import {
  sendResponse,
  successResponse,
} from "../../../../packages/common/response/sendResponse.js";
import { registerService } from "../services/auth.service.js";

export const register = asyncHandler(async (req, res) => {
  const { message, success, data } = await registerService(req.validatedData); 
  return successResponse(
    res,
    message,
    data,
    null,
    201,
  );
});

/*
export const login = asyncHandler(async (req, res) => {
  const { user, token } = await loginService(req.body);

  setAuthCookie(res, token);

  await updateLastLogin(user._id);

  logger.info(`User logged in: ${user.email}`);

  return successResponse(res, 'Login successful', { user, token });
});

export const logout = asyncHandler(async (req, res) => {
  res.clearCookie('user_token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  });

  logger.info(`User logged out: ${req.user?.email || 'unknown'}`);

  return successResponse(res, 'Logged out successfully');
});

export const refreshToken = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    throw new BadRequestError('Refresh token required');
  }

  const { user, token } = await refreshTokenService(refreshToken);

  setAuthCookie(res, token);

  return successResponse(res, 'Token refreshed successfully', { user, token });
});

export const getProfile = asyncHandler(async (req, res) => {
  const user = await getUserById(req.user._id);

  if (!user) {
    throw new NotFoundError('User not found');
  }

  return successResponse(res, 'Profile fetched successfully', { user });
});

export const updateProfile = asyncHandler(async (req, res) => {
  const { firstName, lastName, preferences } = req.body;

  const updatedUser = await updateUserService(req.user._id, {
    firstName,
    lastName,
    preferences
  });

  return successResponse(res, 'Profile updated successfully', { user: updatedUser });
});

export const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  await changePasswordService(req.user._id, currentPassword, newPassword);

  return successResponse(res, 'Password changed successfully');
});

const setAuthCookie = (res, token) => {
  const isProduction = process.env.NODE_ENV === 'production';
  const cookieOptions = {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: '/'
  };

  if (isProduction && process.env.COOKIE_DOMAIN) {
    cookieOptions.domain = process.env.COOKIE_DOMAIN;
  }

  res.cookie('user_token', token, cookieOptions);
};

*/
