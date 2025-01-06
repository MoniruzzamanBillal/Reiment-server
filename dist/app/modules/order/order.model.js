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
exports.orderModel = void 0;
const mongoose_1 = require("mongoose");
const order_constant_1 = require("./order.constant");
const orderItemSchema = new mongoose_1.Schema({
    product: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Product",
        required: [true, "Product is required !!"],
    },
    quantity: {
        type: Number,
        required: [true, "Product quantity is required !!"],
        min: 1,
    },
    price: {
        type: Number,
        required: [true, "Product price is required !!"],
    },
});
const orderSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    discount: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Discount",
    },
    address: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Address",
        required: true,
    },
    payment: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Payment",
    },
    orderItems: [orderItemSchema],
    status: {
        type: String,
        required: true,
        default: order_constant_1.orderStatus.pending,
    },
    totalAmount: {
        type: Number,
        required: [true, "Total order amount is required !!"],
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });
//
orderSchema.pre("find", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        this.find({ isDeleted: { $ne: true } });
        next();
    });
});
orderSchema.pre("findOne", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        this.find({ isDeleted: { $ne: true } });
        next();
    });
});
//
exports.orderModel = (0, mongoose_1.model)("Order", orderSchema);
