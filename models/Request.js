import { Schema, Types, model } from "mongoose";
const requestSchema = Schema(
  {
    user: {
      type: Types.ObjectId,
      required: true,
      ref: "User",
    },
    paymentName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    countPoint: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "accepted", "rejected"],
    },
    requestedAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);

export const requestModel = model("Request", requestSchema);
