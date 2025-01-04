import { z } from "zod";

const addAddressValidationSchema = z.object({
  body: z.object({
    user: z.string().min(1, "userId is required"),
    street: z.string().min(1, "Street is required"),
    district: z.string().min(1, "district is required"),
    division: z.string().min(1, "division is required"),
    postalCode: z.string().min(1, "Postal Code is required"),
  }),
});

const updateAddressValidationSchema = z.object({
  body: z.object({
    user: z.string().min(1, "userId is required").optional(),
    street: z.string().min(1, "Street is required").optional(),
    district: z.string().min(1, "City is required").optional(),
    division: z.string().min(1, "State is required").optional(),
    postalCode: z.string().min(1, "Postal Code is required").optional(),
  }),
});

//
export const addressValidations = {
  addAddressValidationSchema,
  updateAddressValidationSchema,
};
