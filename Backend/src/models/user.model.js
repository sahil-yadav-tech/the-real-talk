import mongoose from "mongoose";
import { type } from "os";

const userSchema = new mongoose.Schema(
  {
    firstName: String,

    lastName: String,

    username: {
      type: String,
      unique: true,
    },

    email: {
      type: String,
      unique: true,
    },

    phone: {
      type: String,
      unique: true,
    },

    password: String,

    gender: String,

    dateOfBirth: {
        type: String,
        default: new Date()
    },

    bio: {
      type: String,
      default: "",
    },

    profileImage: {
      type: String,
      default: "",
    },

    role: {
      type: String,
      default: "user",
    },

    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);