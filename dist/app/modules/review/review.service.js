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
exports.reviewServices = void 0;
const CheckDataExist_1 = require("../../util/CheckDataExist");
const order_model_1 = require("../order/order.model");
const product_model_1 = require("../product/product.model");
const user_model_1 = require("../User/user.model");
const review_model_1 = require("./review.model");
// ! for giving review
const addReview = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, productId, purchaseId } = payload;
    yield (0, CheckDataExist_1.checkDataExist)(user_model_1.userModel, userId, "This user doesn't exist !!");
    yield (0, CheckDataExist_1.checkDataExist)(product_model_1.productModel, productId, "This product doesn't exist !!");
    yield (0, CheckDataExist_1.checkDataExist)(order_model_1.orderModel, purchaseId, "This purchase id doesn't exist !!");
    const result = yield review_model_1.reviewModel.create(payload);
    return result;
});
// ! for getting all review
const getAllReview = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield review_model_1.reviewModel.find();
    return result;
});
// ! for getting user review
const getUserReview = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield review_model_1.reviewModel.find({ userId });
    return result;
});
//
exports.reviewServices = {
    addReview,
    getAllReview,
    getUserReview,
};
