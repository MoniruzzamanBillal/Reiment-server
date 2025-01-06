"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartRouter = void 0;
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const ValidateUser_1 = __importDefault(require("../../middleware/ValidateUser"));
const user_constants_1 = require("../User/user.constants");
const cart_controller_1 = require("./cart.controller");
const cart_validation_1 = require("./cart.validation");
const router = (0, express_1.Router)();
// ! for getting user cart data
router.get("/user-cart", (0, ValidateUser_1.default)(user_constants_1.UserRole.user), cart_controller_1.cartController.getUserCart);
// ! for adding to cart
router.post("/add-to-cart", (0, validateRequest_1.default)(cart_validation_1.cartValidations.addToCart), cart_controller_1.cartController.addToCart);
// ! for adding item in cart
router.patch("/add-cart-item", (0, ValidateUser_1.default)(user_constants_1.UserRole.user), (0, validateRequest_1.default)(cart_validation_1.cartValidations.addItemToCart), cart_controller_1.cartController.addCartItem);
// ! for removing item from cart
router.patch("/remove-cart-item", (0, ValidateUser_1.default)(user_constants_1.UserRole.user), cart_controller_1.cartController.removeCartItem);
// ! for ading cart item quantity
router.patch("/add-cart-item-quantity", (0, ValidateUser_1.default)(user_constants_1.UserRole.user), (0, validateRequest_1.default)(cart_validation_1.cartValidations.addCartItemQuantity), cart_controller_1.cartController.addCartItemQuantity);
// ! for decreasing cart item quantity
router.patch("/decrease-cart-item-quantity", (0, ValidateUser_1.default)(user_constants_1.UserRole.user), (0, validateRequest_1.default)(cart_validation_1.cartValidations.decreaseCartItemQuantity), cart_controller_1.cartController.decreaseCartItemQuantity);
//
exports.cartRouter = router;
