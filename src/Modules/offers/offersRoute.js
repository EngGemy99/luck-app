import express from "express";
import * as offersController from "./offersController.js";
import * as validators from "../../Middlewares/Validations/offersValidation.js";
import { protectedRoutes } from "../../utils/ProtectedRoutes.js";
import { validation } from "../../Middlewares/validation.js";
import { uploadSingleFile } from "../../utils/FileUpload.js";
import { allowedTo } from "../../utils/allowedTo.js";

let router = express.Router();

//! [read]
router.route("/top").get(offersController.topOffers);
router.route("/wall").get(offersController.offersWall);
//! [create]
router
  .route("/top")
  .post(
    uploadSingleFile("image"),
    protectedRoutes,
    allowedTo("admin"),
    validation(validators.addTopOrWallOffers),
    offersController.addTopOffers
  );
router
  .route("/wall")
  .post(
    uploadSingleFile("image"),
    protectedRoutes,
    allowedTo("admin"),
    validation(validators.addTopOrWallOffers),
    offersController.addOffersWall
  );

//! [update]
router
  .route("/top/:id")
  .patch(
    uploadSingleFile("image"),
    protectedRoutes,
    allowedTo("admin"),
    offersController.updateTopOffers
  );

router
  .route("/wall/:id")
  .patch(
    uploadSingleFile("image"),
    protectedRoutes,
    allowedTo("admin"),
    offersController.updateOffersWall
  );
export default router;
