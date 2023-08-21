import express from "express";
import * as wanndsController from "./wanndsController.js";
import { protectedRoutes } from "../../utils/ProtectedRoutes.js";
import { allowedTo } from "../../utils/allowedTo.js";
import * as validators from "../../Middlewares/Validations/wanndsValidation.js";
import { validation } from "../../Middlewares/validation.js";

let router = express.Router();

router
  .route("/")
  .get(protectedRoutes, allowedTo("admin"), wanndsController.getAll);

router
  .route("/")
  .post(
    protectedRoutes,
    allowedTo("admin"),
    validation(validators.addWannds),
    wanndsController.addWannds
  );

export default router;
