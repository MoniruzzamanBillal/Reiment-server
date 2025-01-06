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
exports.discountModel = void 0;
const mongoose_1 = require("mongoose");
const discountSchema = new mongoose_1.Schema({
    code: {
        type: String,
        required: true,
        unique: true,
    },
    percentage: {
        type: Number,
        required: true,
        min: 0,
        max: 90,
    },
    expiryDate: {
        type: String,
        required: [true, "Expiry date is required !!!"],
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });
discountSchema.pre("find", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        this.find({ isDeleted: { $ne: true } });
        next();
    });
});
discountSchema.pre("findOne", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        this.find({ isDeleted: { $ne: true } });
        next();
    });
});
//
exports.discountModel = (0, mongoose_1.model)("Discount", discountSchema);
