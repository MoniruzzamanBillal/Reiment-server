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
exports.addressModel = void 0;
const mongoose_1 = require("mongoose");
const addressSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User is required !!"],
        unique: true,
    },
    street: {
        type: String,
        required: [true, "Street is required"],
    },
    district: {
        type: String,
        required: [true, "City is required"],
    },
    division: {
        type: String,
        required: [true, "State is required"],
    },
    postalCode: {
        type: String,
        required: [true, "Postal code is required"],
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });
addressSchema.pre("find", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        this.find({ isDeleted: { $ne: true } });
        next();
    });
});
addressSchema.pre("findOne", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        this.find({ isDeleted: { $ne: true } });
        next();
    });
});
exports.addressModel = (0, mongoose_1.model)("Address", addressSchema);
