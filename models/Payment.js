import mongoose from "mongoose";
const paymentSchema = mongoose.Schema(
  {
    paymentName: {
      type: String,
      trim: true,
      required: true,
      unique: [true, "paymentName must be unique"],
    },
    image: {
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

export const paymentModel = mongoose.model("Payment", paymentSchema);
