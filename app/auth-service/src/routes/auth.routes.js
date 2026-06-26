import express from "express";
const router = express.Router();
import { validate } from "../middlewares/validate.middleware.js";
import {
  loginSchema,
  registerSchema,
  verifyotpSchema,
} from "../validations/auth.validator.js";
import { checkAuth, login, logout, refreshToken, register, verifyOtp } from "../controllers/auth.controller.js";
import { authenticate } from "../../../../packages/common/middlewares/authenticate.js";

/*
REGISTER ENDPOINT 
*/
router.post("/register", validate(registerSchema), register);

/*
VERIFY OTP AND CREATE USER 
*/
router.post("/verify-otp", validate(verifyotpSchema), verifyOtp);

/*
Login Api
*/
router.post("/login", validate(loginSchema), login);

router.post("/refresh-token", refreshToken);

router.post("/logout", logout);

router.get("/check-auth", authenticate, checkAuth);

export default router;
