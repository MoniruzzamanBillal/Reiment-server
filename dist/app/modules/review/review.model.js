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
exports.reviewModel = void 0;
const mongoose_1 = require("mongoose");
const reviewSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, "User is required "],
    },
    productId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, "User is required "],
    },
    purchaseId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, "User is required "],
    },
    rating: {
        type: Number,
        required: [true, "Rating is required !!"],
        min: 1,
        max: 5,
    },
    comment: {
        type: String,
        required: [true, "Comment is required !!"],
    },
}, { timestamps: true });
reviewSchema.index({ userId: 1, productId: 1, purchaseId: 1 }, { unique: true });
reviewSchema.pre("find", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        this.find({ isDeleted: { $ne: false } });
        next();
    });
});
reviewSchema.pre("findOne", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        this.find({ isDeleted: { $ne: false } });
        next();
    });
});
//
exports.reviewModel = (0, mongoose_1.model)("Review", reviewSchema);
