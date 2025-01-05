import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { userValidationSchemas } from "../User/user.validation";
import { authController } from "./auth.controller";
import { authValidations } from "./auth.validation";

const router = Router();

// ! for registering a user
router.post(
  "/register",
  validateRequest(userValidationSchemas.createUserValidationSchema),
  authController.createUser
);

// ! for login
router.post(
  "/log-in",
  validateRequest(authValidations.loginValidationSchema),
  authController.signIn
);

// ! for sending reset link to email
router.patch("/reset-link/:email", authController.sendResetLink);

// ! for reseting password
router.patch("/reset-password", authController.resetPassWord);

//
export const authRouter = router;
