import { z } from "zod";

// CartItem validation schema
const cartItemSchema = z.object({
  product: z.string().min(1, "Product is required !!"),
  quantity: z.number().min(1, "Quantity must be at least 1"),
  price: z.number().positive("Price must be a positive number"),
});

// Cart validation schema
const cartSchema = z.object({
  user: z.string().min(1, "User is required"),
  cartItems: z
    .array(cartItemSchema)
    .nonempty("Cart must have at least one item"),
});

//
export const cartValidations = {
  cartSchema,
};
