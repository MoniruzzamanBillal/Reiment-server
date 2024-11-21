import { z } from "zod";

const addAddressValidationSchema = z.object({
  body: z.object({
    user: z.string().min(1, "userId is required"),
    street: z.string().min(1, "Street is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    postalCode: z.string().min(1, "Postal Code is required"),
    country: z.string().min(1, "Country is required"),
  }),
});

const updateAddressValidationSchema = z.object({
  body: z.object({
    user: z.string().min(1, "userId is required").optional(),
    street: z.string().min(1, "Street is required").optional(),
    city: z.string().min(1, "City is required").optional(),
    state: z.string().min(1, "State is required").optional(),
    postalCode: z.string().min(1, "Postal Code is required").optional(),
    country: z.string().min(1, "Country is required").optional(),
  }),
});

//
export const addressValidations = {
  addAddressValidationSchema,
  updateAddressValidationSchema,
};
