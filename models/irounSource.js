import mongoose from "mongoose";
const irounSourceSchema = mongoose.Schema(
  {
    apiKey: {
      type: String,
      trim: true,
      required: true,
      minLength: [3, "too short irounSource name"],
    },
  },
  { timestamps: true }
);

export const irounSourceModel = mongoose.model(
  "IrounSource",
  irounSourceSchema
);
