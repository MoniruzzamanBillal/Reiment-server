import { Router } from "express";
import validateUser from "../../middleware/ValidateUser";
import { UserRole } from "../User/user.constants";
import { orderController } from "./order.controller";

const router = Router();

// ! for getting all order data
router.get("/all-order", orderController.getAllOrder);

// ! for getting user order data
router.get(
  "/user-order",
  validateUser(UserRole.user),
  orderController.getUserOrder
);

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

// ! for getting single order
router.get("/detail/:id", orderController.getSingleOrder);

// ! approve order
router.patch(
  "/approve-order/:id",
  validateUser(UserRole.admin),
  orderController.approveOrder
);

// ! cancel order
router.patch(
  "/cancel-order/:id",
  validateUser(UserRole.admin, UserRole.user),
  orderController.cancelOrder
);

//
export const orderRouter = router;
