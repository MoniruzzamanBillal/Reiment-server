import { NextFunction, Request, Response, Router } from "express";
import validateUser from "../../middleware/ValidateUser";
import { upload } from "../../util/SendImageCloudinary";
import { UserRole } from "./user.constants";
import { userController } from "./user.controller";

const router = Router();

// ! for getting all user
router.get("/", userController.getUsers);

// ! for getting logged in user
router.get(
  "/logged-user",
  validateUser(UserRole.admin, UserRole.user),
  userController.getLoggedInUser
);

// ! for updating a user
router.patch(
  "/update-user",
  upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body?.data);
    next();
  },
  validateUser(UserRole.admin, UserRole.user),
  userController.updateUser
);

//
export const userRouter = router;
