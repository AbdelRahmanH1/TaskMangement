import { Router } from "express";
import * as userController from "./user.controller.js";
import validation from "../../middleware/validation.middleware.js";
import { uploadPhoto } from "../../utils/multerr.js";
import {
  registrationSchema,
  forgetPassowrdSceham,
  resetPasswordSchema,
  loginSchema,
} from "./user.schema.js";
import { auth } from "../../middleware/auth.middleware.js";
const router = Router();

router
  .route("/signup")
  .post(validation(registrationSchema), userController.signUp);

router.route("/verify").get(userController.verifyEmail);

router
  .route("/forget_password")
  .post(validation(forgetPassowrdSceham), userController.forgetPassword);

router
  .route("/reset_password")
  .post(validation(resetPasswordSchema), userController.resetPassword);

router.route("/login").post(validation(loginSchema), userController.login);

router
  .route("/add_photo")
  .post(auth, uploadPhoto().single("pp"), userController.addPhoto);

router.route("/delete_photo").delete(auth, userController.deletePhoto);

router
  .route("/update_photo")
  .patch(uploadPhoto().single("pp"), userController.updatePhoto);

router.route("/qr").get(auth, userController.qrFunction);
export default router;
