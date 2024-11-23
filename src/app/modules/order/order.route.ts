import { Router } from "express";
import validateUser from "../../middleware/ValidateUser";
import { UserRole } from "../User/user.constants";
import { orderController } from "./order.controller";

const router = Router();

// ! for direct order item
router.post(
  "/direct-order",
  validateUser(UserRole.user),
  orderController.createDirectOrderProduct
);

// ! for ordering from cart  item
router.post(
  "/cart-order",
  validateUser(UserRole.user),
  orderController.orderFromCartProduct
);

//
export const orderRouter = router;
