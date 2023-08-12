import mongoose from "mongoose";
const offersSchema = mongoose.Schema(
  {
    title: {
      type: String,
      unique: [true, "title must be unique"],
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
    offerType: {
      type: String,
      default: "topOffer",
      enum: ["topOffer", "offersWall"],
    },
  },
  { timestamps: true }
);

export const offersModel = mongoose.model("Offers", offersSchema);
