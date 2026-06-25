import mongoose from "mongoose";
import validator from "validator";

const imageSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      default: "",
    },

    publicId: {
      type: String,
      default: "",
    },
  },
  {
    _id: false,
  }
);

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
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
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate: [validator.isEmail, "Invalid email"],
    },

    password: {
      type: String,
      required: true,
      minlength: 8,
      // select: false,
    },

    authProvider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },

    profilePicture: {
      type: imageSchema,
      default: () => ({}),
    },

    coverPhoto: {
      type: imageSchema,
      default: () => ({}),
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

    phoneNumber: {
      type: String,
      unique: true,
      sparse: true,
      validate: {
        validator: (value) =>
          !value || validator.isMobilePhone(value, "any"),
        message: "Invalid phone number",
      },
    },

    isEmailVerified: {
      type: Boolean,
      default: false,
    },

    isPhoneVerified: {
      type: Boolean,
      default: false,
    },

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

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    accountStatus: {
      type: String,
      enum: ["active", "suspended", "banned", "deactivated"],
      default: "active",
    },

    loginAttempts: {
      type: Number,
      default: 0,
    },

    lockedUntil: {
      type: Date,
      default: null,
    },

    lastLoginAt: {
      type: Date,
      default: null,
    },

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

// Keep ONLY indexes that are NOT already created by unique:true
userSchema.index({ isDeleted: 1 });

export default mongoose.model("User", userSchema);