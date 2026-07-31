import mongoose from "mongoose";
const orderStatusHistorySchema = new mongoose.Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
      index: true,
    },

    oldStatus: {
      type: String,
      required: true,
    },

    newStatus: {
      type: String,
      required: true,
    },

    changedBy: {
      type: String,
      enum: ["USER", "SCHEDULER"],
      default: "USER",
    },

    changedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: false,
  }
);
export default mongoose.model("OrderStatusHistory",orderStatusHistorySchema);