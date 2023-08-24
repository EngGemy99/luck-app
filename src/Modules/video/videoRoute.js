import express from "express";
import * as videoController from "./videoController.js";
import * as validators from "../../Middlewares/Validations/videoValidation.js";
import { protectedRoutes } from "../../utils/ProtectedRoutes.js";
import { validation } from "../../Middlewares/validation.js";
import { uploadSingleFile, uploadSingleVideo } from "../../utils/FileUpload.js";
import { allowedTo } from "../../utils/allowedTo.js";

let router = express.Router();

router
  .route("/")
  .get(videoController.allVideo)
  .post(
    uploadSingleFile("image"),
    protectedRoutes,
    allowedTo("admin"),
    validation(validators.addVideo),
    videoController.addVideo
  );

router
  .route("/:id")
  .patch(
    uploadSingleFile("image"),
    protectedRoutes,
    allowedTo("admin"),
    videoController.updateVideo
  );

export default router;
