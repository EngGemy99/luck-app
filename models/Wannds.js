import mongoose from "mongoose";
const wanndsSchema = mongoose.Schema(
  {
    apiKey: {
      type: String,
      trim: true,
      required: true,
      minLength: [3, "too short wannds name"],
    },
    apiScrit: {
      type: String,
      trim: true,
      required: true,
      minLength: [3, "too short wannds name"],
    },
  },
  { timestamps: true }
);

export const wanndsModel = mongoose.model("Wannds", wanndsSchema);
