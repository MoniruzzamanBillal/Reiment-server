"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addressValidations = void 0;
const zod_1 = require("zod");
const addAddressValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        user: zod_1.z.string().min(1, "userId is required"),
        street: zod_1.z.string().min(1, "Street is required"),
        district: zod_1.z.string().min(1, "district is required"),
        division: zod_1.z.string().min(1, "division is required"),
        postalCode: zod_1.z.string().min(1, "Postal Code is required"),
    }),
});
const updateAddressValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        user: zod_1.z.string().min(1, "userId is required").optional(),
        street: zod_1.z.string().min(1, "Street is required").optional(),
        district: zod_1.z.string().min(1, "City is required").optional(),
        division: zod_1.z.string().min(1, "State is required").optional(),
        postalCode: zod_1.z.string().min(1, "Postal Code is required").optional(),
    }),
});
//
exports.addressValidations = {
    addAddressValidationSchema,
    updateAddressValidationSchema,
};
