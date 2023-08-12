import express from "express";
import * as videoController from "./videoController.js";
import * as validators from "../../Middlewares/Validations/offersValidation.js";
import { protectedRoutes } from "../../utils/ProtectedRoutes.js";
import { validation } from "../../Middlewares/validation.js";
import { uploadSingleVideo } from "../../utils/fileUpload.js";
import { allowedTo } from "../../utils/allowedTo.js";

let router = express.Router();

router
  .route("/")
  .get(videoController.allVideo)
  .post(
    uploadSingleVideo("video"),
    protectedRoutes,
    allowedTo("admin"),
    videoController.addVideo
  );

router
  .route("/:id")

  .patch(
    uploadSingleVideo("video"),
    protectedRoutes,
    allowedTo("admin"),
    videoController.updateVideo
  );

export default router;
