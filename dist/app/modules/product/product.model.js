"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productModel = void 0;
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "product name is required "],
    },
    detail: {
        type: String,
        required: [true, "product detail is required "],
    },
    price: {
        type: Number,
        required: [true, "product price is required "],
    },
    size: {
        type: [String],
        required: [true, "product size is required "],
        enum: ["M", "L", "XL", "XXL"],
    },
    color: {
        type: [String],
        required: [true, "product color is required "],
    },
    material: {
        type: String,
        required: [true, "product material is required "],
    },
    stockQuantity: {
        type: Number,
        required: [true, "product stock quantity is required "],
    },
    productImage: {
        type: String,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });
productSchema.virtual("reviews", {
    ref: "Review",
    localField: "_id",
    foreignField: "productId",
});
productSchema.pre("find", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        this.find({ isDeleted: { $ne: true } });
        next();
    });
});
productSchema.pre("findOne", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        this.find({ isDeleted: { $ne: true } });
        next();
    });
});
//
exports.productModel = (0, mongoose_1.model)("Product", productSchema);
