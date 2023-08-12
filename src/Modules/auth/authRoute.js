import express from "express";
import { register, login } from "./authController.js";
import * as validators from "../../Middlewares/Validations/authValidation.js";
import { validation } from "../../Middlewares/validation.js";
let router = express.Router();
router.post("/register", validation(validators.register), register);
router.post("/login", validation(validators.login), login);
export default router;
