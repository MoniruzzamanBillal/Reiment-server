"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartValidations = void 0;
const zod_1 = require("zod");
const addToCart = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string().min(1, "User is required"),
        productId: zod_1.z.string().min(1, "User is required"),
        quantity: zod_1.z.number().nonnegative("product quantity is required"),
        price: zod_1.z.number().nonnegative("product price is required"),
    }),
});
const addItemToCart = zod_1.z.object({
    body: zod_1.z.object({
        productId: zod_1.z.string().min(1, "User is required"),
        quantity: zod_1.z.number().nonnegative("product quantity is required"),
        price: zod_1.z.number().nonnegative("product price is required"),
    }),
});
// ! for adding cart item quantity
const addCartItemQuantity = zod_1.z.object({
    body: zod_1.z.object({
        productId: zod_1.z.string().min(1, "product is required"),
        quantity: zod_1.z.number().nonnegative("product quantity is required"),
    }),
});
// ! for decreasing cart item quantity
const decreaseCartItemQuantity = zod_1.z.object({
    body: zod_1.z.object({
        productId: zod_1.z.string().min(1, "User is required"),
        quantity: zod_1.z.number().nonnegative("product quantity is required"),
    }),
});
//
exports.cartValidations = {
    addToCart,
    addItemToCart,
    addCartItemQuantity,
    decreaseCartItemQuantity,
};
