import { z } from "zod";

// ! create product validation schema
const createProduct = z.object({
  body: z.object({
    name: z.string().min(1, { message: "Product name is required" }),
    detail: z.string().min(1, { message: "Product detail is required" }),
    price: z
      .number()
      .positive({ message: "Product price must be a positive number" }),
    size: z
      .array(z.string().min(1))
      .nonempty({ message: "Product size is required" }),
    color: z
      .array(z.string().min(1))
      .nonempty({ message: "Product color is required" }),
    material: z.string().min(1, { message: "Product material is required" }),
    stockQuantity: z.number().int().nonnegative({
      message: "Stock quantity must be a non-negative integer",
    }),

    isDeleted: z.boolean().optional().default(false),
  }),
});

//
export const productValidationSchema = {
  createProduct,
};