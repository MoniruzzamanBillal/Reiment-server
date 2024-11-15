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

// ! for adding item in cart
router.patch(
  "/add-cart-item",
  validateUser(UserRole.user),
  validateRequest(cartValidations.addItemToCart),
  cartController.addCartItem
);

// ! for removing item from cart
router.patch(
  "/remove-cart-item",
  validateUser(UserRole.user),
  cartController.removeCartItem
);

//
export const cartRouter = router;
