import express from "express";
import * as userController from "./userController.js";
import { protectedRoutes } from "../../utils/ProtectedRoutes.js";
import { uploadSingleFile } from "../../utils/FileUpload.js";
import requestRoute from "../request/requestRoute.js";
let router = express.Router();
router.patch(
  "/edit-profile-image",
  uploadSingleFile("profilePic"),
  protectedRoutes,
  userController.editProfilePic
);
router.post("/forgot-password", userController.forgotPassword);
router.patch("/reset-password", userController.resetPassword);
router.route("/profile").get(protectedRoutes, userController.profile);
router.use("/request", requestRoute);
router.get("/:id", userController.getUser);

export default router;
