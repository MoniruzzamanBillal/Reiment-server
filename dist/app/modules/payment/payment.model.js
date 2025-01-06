"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentModel = void 0;
const mongoose_1 = require("mongoose");
const payment_constant_1 = require("./payment.constant");
const paymentSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    orderId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Order",
    },
    amount: {
        type: Number,
        required: true,
    },
    paymentStatus: {
        type: String,
        default: payment_constant_1.PAYMENTSTATUS.Pending,
    },
    transactionId: {
        type: String,
        required: true,
    },
}, { timestamps: true });
exports.paymentModel = (0, mongoose_1.model)("Payment", paymentSchema);
