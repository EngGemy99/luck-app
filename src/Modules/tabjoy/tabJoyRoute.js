import express from "express";
import * as tabJoyController from "./tabJoyController.js";
import { protectedRoutes } from "../../utils/ProtectedRoutes.js";
import { allowedTo } from "../../utils/allowedTo.js";
import * as validators from "../../Middlewares/Validations/toyJoyValidation.js";
import { validation } from "../../Middlewares/validation.js";
let router = express.Router();

router
  .route("/")
  .get(protectedRoutes, allowedTo("admin"), tabJoyController.getAll)
  .post(
    protectedRoutes,
    allowedTo("admin"),
    validation(validators.addToyJoy),
    tabJoyController.addToyJoy
  );

export default router;
