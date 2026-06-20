import express from "express";
const router = express.Router();
import { validate } from "../middlewares/validate.middleware.js";
import { loginSchema, registerSchema } from "../validations/auth.validator.js";
import { register } from "../controllers/auth.controller.js";

/*
REGISTER ENDPOINT 
*/
router.post("/register", validate(registerSchema), register);

export default router;
