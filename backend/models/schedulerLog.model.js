import mongoose from "mongoose";
const schedulerLogSchema = new mongoose.Schema(
  {
    startedAt: {
      type: Date,
      required: true,
    },

    finishedAt: {
      type: Date,
      required: true,
    },

    totalOrdersChecked: {
      type: Number,
      default: 0,
    },

    totalOrdersUpdated: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["SUCCESS", "FAILED"],
      required: true,
    },

    error: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("SchedulerLog", schedulerLogSchema);