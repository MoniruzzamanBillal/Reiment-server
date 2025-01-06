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
exports.addressServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../Error/AppError"));
const address_model_1 = require("./address.model");
// ! for creating address
const addAddress = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const haveAddress = yield address_model_1.addressModel.find({ user: payload === null || payload === void 0 ? void 0 : payload.user });
    if (haveAddress === null || haveAddress === void 0 ? void 0 : haveAddress.length) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "This user already have an address !!!");
    }
    const result = yield address_model_1.addressModel.create(payload);
    return result;
});
// ! for getting user address
const getUserAddress = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield address_model_1.addressModel.find({ user: userId });
    return result;
});
// ! for updating address
const updateUserAddress = (payload, id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield address_model_1.addressModel.findByIdAndUpdate(id, payload, {
        new: true,
        upsert: true,
    });
    return result;
});
// ! for deleting user address
const deleteUserAddress = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield address_model_1.addressModel.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    return result;
});
//
exports.addressServices = {
    addAddress,
    getUserAddress,
    updateUserAddress,
    deleteUserAddress,
};
