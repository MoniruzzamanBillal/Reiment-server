"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const user_validation_1 = require("../User/user.validation");
const auth_controller_1 = require("./auth.controller");
const auth_validation_1 = require("./auth.validation");
const router = (0, express_1.Router)();
// ! for registering a user
router.post("/register", (0, validateRequest_1.default)(user_validation_1.userValidationSchemas.createUserValidationSchema), auth_controller_1.authController.createUser);
// ! for login
router.post("/log-in", (0, validateRequest_1.default)(auth_validation_1.authValidations.loginValidationSchema), auth_controller_1.authController.signIn);
// ! for sending reset link to email
router.patch("/reset-link/:email", auth_controller_1.authController.sendResetLink);
// ! for reseting password
router.patch("/reset-password", auth_controller_1.authController.resetPassWord);
//
exports.authRouter = router;
