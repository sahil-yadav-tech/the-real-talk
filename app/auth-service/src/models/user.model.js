import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    // Basic Information
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
      minlength: 2,
      maxlength: 50,
    },

    lastName: {
      type: String,
      trim: true,
      maxlength: 50,
      default: "",
    },

    username: {
      type: String,
      trim: true,
      unique: true,
      sparse: true,
      lowercase: true,
      minlength: 3,
      maxlength: 30,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: validator.isEmail,
        message: "Invalid email address",
      },
    },

    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false,
    },

    // Profile
    profilePicture: {
      url: String,
      publicId: String,
    },

    coverPhoto: {
      url: String,
      publicId: String,
    },

    bio: {
      type: String,
      maxlength: 250,
      default: "",
    },

    dateOfBirth: {
      type: Date,
    },

    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },

    // Contact Information
    phoneNumber: {
      type: String,
      unique: true,
      sparse: true,
    },

    // Verification
    isEmailVerified: {
      type: Boolean,
      default: false,
    },

    isPhoneVerified: {
      type: Boolean,
      default: false,
    },

    // User Status
    status: {
      type: String,
      enum: [
        "Available",
        "Busy",
        "At work",
        "In meeting",
        "Offline",
      ],
      default: "Available",
    },

    isOnline: {
      type: Boolean,
      default: false,
    },

    lastSeen: {
      type: Date,
      default: null,
    },

    // Privacy Settings
    privacy: {
      lastSeen: {
        type: String,
        enum: ["everyone", "contacts", "nobody"],
        default: "everyone",
      },

      profilePhoto: {
        type: String,
        enum: ["everyone", "contacts", "nobody"],
        default: "everyone",
      },

      about: {
        type: String,
        enum: ["everyone", "contacts", "nobody"],
        default: "everyone",
      },
    },

    // Push Notification
    fcmTokens: [
      {
        type: String,
      },
    ],

    // Blocked Users
    blockedUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    // Devices
    devices: [
      {
        deviceId: String,
        deviceName: String,
        lastActive: Date,
      },
    ],

    // Authentication
    refreshTokenVersion: {
      type: Number,
      default: 0,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    // Soft Delete
    isDeleted: {
      type: Boolean,
      default: false,
    },

    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
// userSchema.index({ email: 1 });
userSchema.index({ isOnline: 1 });

const User = mongoose.model("User", userSchema);

export default User;