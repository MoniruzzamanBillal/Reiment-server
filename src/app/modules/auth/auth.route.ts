import { NextFunction, Request, Response, Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { upload } from "../../util/SendImageCloudinary";
import { userValidationSchemas } from "../User/user.validation";
import { authController } from "./auth.controller";

const router = Router();

// ! for registering a user
router.post(
  "/register",
  upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(userValidationSchemas.createUserValidationSchema),
  authController.createUser
);

//
export const authRouter = router;
