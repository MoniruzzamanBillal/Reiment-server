"use strict";
// ! create user in database
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
exports.authServices = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../config"));
const AppError_1 = __importDefault(require("../../Error/AppError"));
const sendEmail_1 = require("../../util/sendEmail");
const user_model_1 = require("../User/user.model");
const auth_util_1 = require("./auth.util");
// ! create user in database
const createUserIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.userModel.create(Object.assign({}, payload));
    return result;
});
// ! sign in
const signInFromDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.userModel.findOne({ email: payload === null || payload === void 0 ? void 0 : payload.email });
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User dont exist with this email !!!");
    }
    const isPasswordMatch = yield bcrypt_1.default.compare(payload === null || payload === void 0 ? void 0 : payload.password, user === null || user === void 0 ? void 0 : user.password);
    if (!isPasswordMatch) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "Password don't match !!");
    }
    const userId = user === null || user === void 0 ? void 0 : user._id.toHexString();
    const userRole = user === null || user === void 0 ? void 0 : user.userRole;
    const jwtPayload = {
        userId,
        userRole,
    };
    const token = (0, auth_util_1.createToken)(jwtPayload, config_1.default.jwt_secret, "20d");
    return {
        user,
        token,
    };
    //
});
// ! send mail for reseting password
const resetMailLink = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield user_model_1.userModel.findOne({ email: email });
    if (!userData) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "User don't exist !!");
    }
    if (userData === null || userData === void 0 ? void 0 : userData.isDeleted) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "User is deleted !!");
    }
    const userId = userData === null || userData === void 0 ? void 0 : userData._id.toHexString();
    const userRole = userData === null || userData === void 0 ? void 0 : userData.userRole;
    const jwtPayload = {
        userId,
        userRole,
        name: userData === null || userData === void 0 ? void 0 : userData.email,
    };
    const token = (0, auth_util_1.createToken)(jwtPayload, config_1.default.jwt_secret, "5m");
    // const resetLink = `http://localhost:5173/reset-password/${token}`;
    const resetLink = `https://reiment.vercel.app/reset-password/${token}`;
    const sendMailResponse = yield (0, sendEmail_1.sendEmail)(resetLink, email);
    return sendMailResponse;
});
// ! for reseting password
const resetPasswordFromDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, password } = payload;
    // ! check if  user exist
    const userData = yield user_model_1.userModel.findById(userId);
    if (!userData) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "User dont exist !!! ");
    }
    if (userData === null || userData === void 0 ? void 0 : userData.isDeleted) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "User is deleted !!");
    }
    const hashedPassword = yield bcrypt_1.default.hash(password, Number(config_1.default.bcrypt_salt_rounds));
    yield user_model_1.userModel.findByIdAndUpdate(userId, { password: hashedPassword }, { new: true });
    return null;
});
//
exports.authServices = {
    createUserIntoDB,
    signInFromDb,
    resetMailLink,
    resetPasswordFromDb,
};
