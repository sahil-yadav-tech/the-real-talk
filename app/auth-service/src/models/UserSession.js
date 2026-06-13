import mongoose from "mongoose";

const userSessionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    refreshToken: {
      type: String,
      required: true,
    },

    deviceId: {
      type: String,
      required: true,
    },

    deviceName: String,

    platform: {
      type: String,
      enum: [
        "android",
        "ios",
        "windows",
        "mac",
        "linux",
        "web",
      ],
    },

    ipAddress: String,

    userAgent: String,

    fcmToken: String,

    isActive: {
      type: Boolean,
      default: true,
    },

    expiresAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

userSessionSchema.index({ user: 1 });
userSessionSchema.index({ refreshToken: 1 });

export default mongoose.model(
  "UserSession",
  userSessionSchema
);