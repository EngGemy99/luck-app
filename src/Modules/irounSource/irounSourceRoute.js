import express from "express";
import * as irounSourceController from "./irounSourceController.js";
import { protectedRoutes } from "../../utils/ProtectedRoutes.js";
import { allowedTo } from "../../utils/allowedTo.js";
import * as validators from "../../Middlewares/Validations/irounSourceValidation.js";
import { validation } from "../../Middlewares/validation.js";
let router = express.Router();

router
  .route("/")
  .get(irounSourceController.getAll)
  .post(
    protectedRoutes,
    allowedTo("admin"),
    validation(validators.addIrounSource),
    irounSourceController.addIrounSource
  );

export default router;
