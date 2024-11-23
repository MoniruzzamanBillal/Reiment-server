import { z } from "zod";

// ! for add cupon validation schema
const addDiscountValidationSchema = z.object({
  body: z.object({
    code: z.string().min(1, { message: "Code is required" }),
    percentage: z
      .number()
      .min(0, { message: "Percentage must be at least 0" })
      .max(90, { message: "Percentage cannot exceed 90" }),
  }),
});

//
export const discountValidationSchema = {
  addDiscountValidationSchema,
};
