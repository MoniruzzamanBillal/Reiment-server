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
exports.cartModel = void 0;
const mongoose_1 = require("mongoose");
const cartItemSchema = new mongoose_1.Schema({
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
        required: true,
    },
});
const cartSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    cartItems: [cartItemSchema],
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });
cartSchema.pre("find", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        this.find({ isDeleted: { $ne: true } });
        next();
    });
});
cartSchema.pre("findOne", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        this.find({ isDeleted: { $ne: true } });
        next();
    });
});
//
exports.cartModel = (0, mongoose_1.model)("Cart", cartSchema);
