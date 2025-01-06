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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTotalAmount = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../Error/AppError"));
const discount_model_1 = require("../discount/discount.model");
const getTotalAmount = (discount, total) => __awaiter(void 0, void 0, void 0, function* () {
    const today = new Date();
    const discountData = yield discount_model_1.discountModel.findById(discount);
    if (!discountData) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "this cupon doesn't exist !!");
    }
    const expireDate = new Date(discountData === null || discountData === void 0 ? void 0 : discountData.expiryDate);
    if (expireDate <= today) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, " This cupon is expired !!");
    }
    const discountAmount = total * ((discountData === null || discountData === void 0 ? void 0 : discountData.percentage) / 100);
    const totalAmount = total - discountAmount;
    return totalAmount;
});
exports.getTotalAmount = getTotalAmount;
