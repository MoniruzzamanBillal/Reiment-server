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
exports.discountServices = void 0;
const discount_model_1 = require("./discount.model");
// ! for adding discount cupon
const addDiscountCupon = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { code, percentage, cuponExpireDay } = payload;
    const today = new Date();
    today.setDate(today.getDate() + cuponExpireDay);
    const expiryDate = today.toISOString();
    const result = yield discount_model_1.discountModel.create({ code, percentage, expiryDate });
    return result;
});
// ! for getting all cupon data
const getAllCuponData = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield discount_model_1.discountModel.find();
    return result;
});
// ! for getting single cupon data
const getSingleCupon = (cuponId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield discount_model_1.discountModel.findById(cuponId);
    return result;
});
// ! for updating cupon data
const updateCuponData = (payload, cuponId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield discount_model_1.discountModel.findByIdAndUpdate(cuponId, payload, {
        new: true,
        upsert: true,
    });
    return result;
});
// ! for deleting cupon data
const deleteCupon = (cuponId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield discount_model_1.discountModel.findByIdAndUpdate(cuponId, { isDeleted: true }, { new: true, upsert: true });
    return result;
});
//
exports.discountServices = {
    addDiscountCupon,
    getAllCuponData,
    getSingleCupon,
    updateCuponData,
    deleteCupon,
};
