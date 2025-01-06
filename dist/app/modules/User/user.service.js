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
exports.userServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../Error/AppError"));
const SendImageCloudinary_1 = require("../../util/SendImageCloudinary");
const user_constants_1 = require("./user.constants");
const user_model_1 = require("./user.model");
// ! for getting all user
const getUsersFromDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.userModel.find({ userRole: { $ne: user_constants_1.UserRole.admin } });
    return result;
});
// ! for getting logged in user
const getLoggedInUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.userModel.findById(userId);
    return result;
});
// ! for updating a user
const updateUser = (payload, file, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield user_model_1.userModel.findById(userId);
    if (!userData) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "User dont exist !!");
    }
    if (file) {
        const name = userData === null || userData === void 0 ? void 0 : userData.name.trim();
        const path = (file === null || file === void 0 ? void 0 : file.path).trim();
        const cloudinaryResponse = yield (0, SendImageCloudinary_1.SendImageCloudinary)(path, name);
        const profileImg = cloudinaryResponse === null || cloudinaryResponse === void 0 ? void 0 : cloudinaryResponse.secure_url;
        payload.profilePicture = profileImg;
    }
    const result = yield user_model_1.userModel.findByIdAndUpdate(userId, payload, {
        new: true,
    });
    return result;
});
//
exports.userServices = {
    getUsersFromDb,
    getLoggedInUser,
    updateUser,
};
