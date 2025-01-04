import { z } from "zod";

const addToCart = z.object({
  body: z.object({
    userId: z.string().min(1, "User is required"),
    productId: z.string().min(1, "User is required"),
    quantity: z.number().nonnegative("product quantity is required"),
    price: z.number().nonnegative("product price is required"),
  }),
});

const addItemToCart = z.object({
  body: z.object({
    productId: z.string().min(1, "User is required"),
    quantity: z.number().nonnegative("product quantity is required"),
    price: z.number().nonnegative("product price is required"),
  }),
});

// ! for adding cart item quantity
const addCartItemQuantity = z.object({
  body: z.object({
    productId: z.string().min(1, "product is required"),
    quantity: z.number().nonnegative("product quantity is required"),
  }),
});

// ! for decreasing cart item quantity
const decreaseCartItemQuantity = z.object({
  body: z.object({
    productId: z.string().min(1, "User is required"),
    quantity: z.number().nonnegative("product quantity is required"),
  }),
});

//
export const cartValidations = {
  addToCart,
  addItemToCart,
  addCartItemQuantity,
  decreaseCartItemQuantity,
};
