import express from "express";
import * as requestController from "./requestController.js";
import * as validators from "../../Middlewares/Validations/requestValidation.js";
import { protectedRoutes } from "../../utils/ProtectedRoutes.js";
import { validation } from "../../Middlewares/validation.js";
import { allowedTo } from "../../utils/allowedTo.js";
let router = express.Router({ mergeParams: true });
router.post("/", protectedRoutes, requestController.withdrawalRequest);
router.get(
  "/",
  protectedRoutes,
  allowedTo("admin"),
  requestController.allRequest
);
router.patch(
  "/:id",
  protectedRoutes,
  allowedTo("admin"),
  requestController.acceptedOrCancelRequest
);

export default router;
