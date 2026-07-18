import mongoose from "mongoose"
const processedMessageSchema = new mongoose.Schema(
  {
    messageId: {
      type: String,
      required: true,
    },

    idempotencyKey: {
      type: String,
      required: true,
      unique: true,
    },

    email: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["PROCESSING", "COMPLETED"],
      default: "PROCESSING",
    },
  },
  {
    timestamps: true,
  }
);

const ProcessedMessage = new mongoose.model("processedMessage", processedMessageSchema)
export default ProcessedMessage