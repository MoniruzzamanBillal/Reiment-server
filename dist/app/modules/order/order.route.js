"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRouter = void 0;
const express_1 = require("express");
const ValidateUser_1 = __importDefault(require("../../middleware/ValidateUser"));
const user_constants_1 = require("../User/user.constants");
const order_controller_1 = require("./order.controller");
const router = (0, express_1.Router)();
// ! for getting all order data
router.get("/all-order", order_controller_1.orderController.getAllOrder);
// ! for getting user order data
router.get("/user-order", (0, ValidateUser_1.default)(user_constants_1.UserRole.user), order_controller_1.orderController.getUserOrder);
// ! for direct order item
router.post("/direct-order", (0, ValidateUser_1.default)(user_constants_1.UserRole.user), order_controller_1.orderController.createDirectOrderProduct);
// ! for ordering from cart  item
router.post("/cart-order", (0, ValidateUser_1.default)(user_constants_1.UserRole.user), order_controller_1.orderController.orderFromCartProduct);
// ! for getting single order
router.get("/detail/:id", order_controller_1.orderController.getSingleOrder);
// ! approve order
router.patch("/approve-order/:id", (0, ValidateUser_1.default)(user_constants_1.UserRole.admin), order_controller_1.orderController.approveOrder);
// ! cancel order
router.patch("/cancel-order/:id", (0, ValidateUser_1.default)(user_constants_1.UserRole.admin, user_constants_1.UserRole.user), order_controller_1.orderController.cancelOrder);
//
exports.orderRouter = router;
