import {
  errorResponse,
  successResponse,
} from "../../../../packages/common/response/sendResponse.js";
import { asyncHandler } from "../../../../packages/common/utils/asyncHandler.js";
import {
  loginService,
  logoutService,
  refreshTokenService,
  registerService,
  verifyOtpService,
} from "../services/auth.service.js";

/*

*/
export const register = asyncHandler(async (req, res) => {
  const data = await registerService(req.validatedData);

  return successResponse(res, data.message, data.data, 201);
});

/*
VERIFY OTP 
CHECK IN REDIS OTP
CREATE USER AFTER VERIFY 
*/
export const verifyOtp = asyncHandler(async (req, res) => {
  const data = await verifyOtpService(req.validatedData);
  return successResponse(res, data.message, data.data, 201);
});

/*
LOGIN API
*/
export const login = asyncHandler(async (req, res) => {
  const data = await loginService(req.validatedData);
  console.log(data, "data");

  res.cookie("refreshToken", data.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.cookie("sessionId", data.sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return successResponse(res, "Login successful", {
    user: data.user,
    accessToken: data.accessToken,
  });
});

export const refreshToken = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  const sessionId = req.cookies.sessionId;
  // console.log(req.cookies);

  const data = await refreshTokenService(refreshToken, sessionId);

  res.cookie("refreshToken", data.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return successResponse(res, "Token refreshed", {
    accessToken: data.accessToken,
  });
});

export const logout = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  const sessionId = req.cookies.sessionId;

  await logoutService(refreshToken, sessionId);

  res.clearCookie("refreshToken");

  res.clearCookie("sessionId");

  return successResponse(res, "Logout successful");
});

export const checkAuth = asyncHandler(async (req, res) => {
  return successResponse(res, "Authenticated", req.user);
});
