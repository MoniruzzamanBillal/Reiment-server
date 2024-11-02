import { Router } from "express";
import { userController } from "./user.controller";

const router = Router();

// ! for getting all user
router.get("/", userController.getUsers);

//
export const userRouter = router;
