import mongoose from "mongoose";
const videoSchema = mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
    },
    image: {
      type: Object,
      default: {},
      required: true,
    },
    url: {
      type: String,
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
