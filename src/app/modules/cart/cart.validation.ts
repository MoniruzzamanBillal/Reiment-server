import { z } from "zod";

const addToCart = z.object({
  body: z.object({
    userId: z.string().min(1, "User is required"),
    productId: z.string().min(1, "User is required"),
    quantity: z.number().nonnegative("product quantity is required"),
    price: z.number().nonnegative("product price is required"),
  }),
});

//
export const cartValidations = {
  addToCart,
};
