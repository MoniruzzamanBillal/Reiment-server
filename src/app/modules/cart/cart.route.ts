import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import validateUser from "../../middleware/ValidateUser";
import { UserRole } from "../User/user.constants";
import { cartController } from "./cart.controller";
import { cartValidations } from "./cart.validation";

const router = Router();

// ! for getting user cart data
router.get(
  "/user-cart",
  validateUser(UserRole.user),
  cartController.getUserCart
);

// ! for adding to cart
router.post(
  "/add-to-cart",
  validateRequest(cartValidations.addToCart),
  cartController.addToCart
);

//
export const cartRouter = router;
