"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.discountValidationSchema = void 0;
const zod_1 = require("zod");
// ! for add cupon validation schema
const addDiscountValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        code: zod_1.z.string().min(1, { message: "Code is required" }),
        percentage: zod_1.z
            .number()
            .min(0, { message: "Percentage must be at least 0" })
            .max(90, { message: "Percentage cannot exceed 90" }),
    }),
});
//
exports.discountValidationSchema = {
    addDiscountValidationSchema,
};
