import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

//!NOTE:replace import  "@common/errors/AppError.js"
import AppError from "../../../../packages/common/errors/AppError.js";

if (!process.env.JWT_SECRET) {
  throw new AppError("JWT is not defined");
}

export const register = async (req, res) => {
  console.log(req.body, "Body In register");

  try {
  } catch (error) {}
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    /*
    Check User Exists
    */
    const userExists = await User.findOne({ email });

    if (!userExists) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    /*
    Compare Password
    */
    const matchPassword = await bcrypt.compare(
      password, // Plain Password
      userExists.password, // Hashed Password
    );

    if (!matchPassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    const token = jwt.sign({ userId: userExists._id }, process.env.JWT_SECRET, {
      expiresIn: "3m", // 3 minutes
    });
    res.cookie("user_token", token, {
      httpOnly: true,
      secure: false, // production me true (HTTPS)
      sameSite: "strict",
      maxAge: 3 * 60 * 1000, // 3 minutes
    });

    /*
    Login Success
    */
    return res.status(200).json({
      success: true,
      message: "Login Successful",
      user: {
        _id: userExists._id,
        firstName: userExists.firstName,
        lastName: userExists.lastName,
        email: userExists.email,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
