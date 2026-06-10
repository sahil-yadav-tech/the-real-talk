import bcrypt from "bcryptjs";
import User from "../models/user.model.js";

export const register = async (req, res) => {

    console.log("req.body");
    
  try {
    const {
      firstName,
      lastName,
      username,
      email,
      phone,
      password,
      gender,
    //   dateOfBirth,
    } = req.body;

    const existingUser = await User.findOne({
      $or: [
        { email },
        { username },
        { phone }
      ],
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message:
          "User already exists",
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

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
      message:
        "User registered successfully",
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