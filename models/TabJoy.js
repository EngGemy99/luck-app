import mongoose from "mongoose";
const tabJoySchema = mongoose.Schema(
  {
    apiAndroid: {
      type: String,
      trim: true,
      required: true,
      minLength: [3, "too short tabJoy name"],
    },
    apiIos: {
      type: String,
      trim: true,
      required: true,
      minLength: [3, "too short tabJoy name"],
    },
  },
  { timestamps: true }
);

export const tabJoyModel = mongoose.model("TabJoy", tabJoySchema);
