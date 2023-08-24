import mongoose from "mongoose";

const payoutSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  money: {
    type: Number,
    required: true,
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
});

export const payoutModel = mongoose.model("Payout", payoutSchema);
