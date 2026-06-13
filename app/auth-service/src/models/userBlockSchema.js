import mongoose from "mongoose";

const userBlockSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    blockedUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

userBlockSchema.index(
  {
    user: 1,
    blockedUser: 1,
  },
  {
    unique: true,
  }
);

export default mongoose.model(
  "UserBlock",
  userBlockSchema
);