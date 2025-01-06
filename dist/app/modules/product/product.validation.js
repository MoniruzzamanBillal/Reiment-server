"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productValidationSchema = void 0;
const zod_1 = require("zod");
// ! create product validation schema
const createProduct = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, { message: "Product name is required" }),
        detail: zod_1.z.string().min(1, { message: "Product detail is required" }),
        price: zod_1.z
            .number()
            .positive({ message: "Product price must be a positive number" }),
        size: zod_1.z
            .array(zod_1.z.string().min(1))
            .nonempty({ message: "Product size is required" }),
        color: zod_1.z
            .array(zod_1.z.string().min(1))
            .nonempty({ message: "Product color is required" }),
        material: zod_1.z.string().min(1, { message: "Product material is required" }),
        stockQuantity: zod_1.z.number().int().nonnegative({
            message: "Stock quantity must be a non-negative integer",
        }),
    }),
});
// ! for updating a product
const updateProduct = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, { message: "Product name is required" }).optional(),
        detail: zod_1.z
            .string()
            .min(1, { message: "Product detail is required" })
            .optional(),
        price: zod_1.z
            .number()
            .positive({ message: "Product price must be a positive number" })
            .optional(),
        size: zod_1.z
            .array(zod_1.z.string().min(1))
            .nonempty({ message: "Product size is required" })
            .optional(),
        color: zod_1.z
            .array(zod_1.z.string().min(1))
            .nonempty({ message: "Product color is required" })
            .optional(),
        material: zod_1.z
            .string()
            .min(1, { message: "Product material is required" })
            .optional(),
        stockQuantity: zod_1.z
            .number()
            .int()
            .nonnegative({
            message: "Stock quantity must be a non-negative integer",
        })
            .optional(),
    }),
});
//
exports.productValidationSchema = {
    createProduct,
    updateProduct,
};
