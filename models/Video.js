import mongoose from "mongoose";
const videoSchema = mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    video: {
      type: Object,
      default: {},
    },
    status: {
      type: String,
      default: "active",
      enum: ["active", "deactivate"],
    },
  },
  { timestamps: true }
);

export const videoModel = mongoose.model("Video", videoSchema);
