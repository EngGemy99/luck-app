import express from "express";
import * as paymentController from "./paymentController.js";
import * as validators from "../../Middlewares/Validations/paymentValidation.js";
import { protectedRoutes } from "../../utils/ProtectedRoutes.js";
import { validation } from "../../Middlewares/validation.js";
import { uploadSingleFile } from "../../utils/FileUpload.js";
import { allowedTo } from "../../utils/allowedTo.js";

let router = express.Router();

//! to get all payment way
router
  .route("/")
  .get(
    protectedRoutes,
    allowedTo("admin", "user"),
    paymentController.getAllPayment
  );

//! to add a new payment way
router
  .route("/")
  .post(
    uploadSingleFile("paymentImage"),
    protectedRoutes,
    allowedTo("admin"),
    paymentController.addPaymentWay
  );

//! to update the name or image or status of the payment
router
  .route("/:id")
  .patch(
    uploadSingleFile("paymentImage"),
    protectedRoutes,
    allowedTo("admin"),
    paymentController.updatePaymentWay
  );

export default router;
