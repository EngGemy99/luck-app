import express from "express";
import * as adminController from "./adminController.js";
import * as validators from "../../Middlewares/Validations/userValidation.js";
import { protectedRoutes } from "../../utils/ProtectedRoutes.js";
import { validation } from "../../Middlewares/validation.js";
import { uploadSingleFile } from "../../utils/FileUpload.js";
import { allowedTo } from "../../utils/allowedTo.js";
let router = express.Router();

router
  .route("/")
  .get(protectedRoutes, allowedTo("admin"), adminController.allUser);

router
  .route("/:id/edit-point")
  .patch(
    protectedRoutes,
    allowedTo("admin"),
    validation(validators.editUserPoint),
    adminController.editUserPoint
  );
router
  .route("/:id/delete")
  .delete(
    protectedRoutes,
    allowedTo("admin"),
    validation(validators.deleteUser),
    adminController.deleteUser
  );

router
  .route("/:id/edit-status")
  .patch(
    protectedRoutes,
    allowedTo("admin"),
    validation(validators.editStatusUser),
    adminController.editStatusUser
  );
router
  .route("/profile")
  .get(protectedRoutes, adminController.profile)
  .patch(
    uploadSingleFile("image"),
    protectedRoutes,
    allowedTo("admin"),
    validation(validators.updateProfile),
    adminController.updateProfile
  );

export default router;
