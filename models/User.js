import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { requestModel } from "./Request.js";
const userSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      trim: true,
      required: true,
      minLength: [1, "too short user name"],
    },
    email: {
      type: String,
      trim: true,
      required: true,
      minLength: 1,
      unique: [true, "email must be unique"],
    },
    password: {
      type: String,
      required: true,
      minLength: [6, "minLength 6 characters"],
    },
    profilePic: {
      type: Object,
      default: {
        public_id: "",
        secure_url:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDtd0soCSRdpo8Y5klekJdABh4emG2P29jwg&usqp=CAU",
      },
    },
    role: {
      type: String,
      default: "user",
      enum: ["admin", "user"],
    },
    points: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      default: "active",
      enum: ["active", "blocked"],
    },
  },
  { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } }
);

userSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    this.password = bcrypt.hashSync(this.password, 10);
  }
  next();
});

userSchema.virtual("previous-requests", {
  ref: "Request",
  localField: "_id",
  foreignField: "user",
});

userSchema.pre(/^find/, function () {
  this.populate({
    path: "previous-requests",
    match: { status: "accepted" },
  });
});
export const userModel = mongoose.model("User", userSchema);
