import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
if (!process.env.JWT_SECRET) {
  throw new Error("JWT is not defined");
}

export const register = async (req, res) => {
  // console.log(req.body, "Body In register");

  try {
    const {
      firstName,
      lastName,
      username,
      email,
      phone,
      password,
      gender,
      confirmPassword,
    } = req.body;

    /*
    Validations
    */
    const existingUser = await User.findOne({
      $or: [{ email }, { username }, { phone }],
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Confirm password and password dont match",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      lastName,
      username,
      email,
      phone,
      password: hashedPassword,
      gender,
      //   dateOfBirth,
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.log(error, "error");

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
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
