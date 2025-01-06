"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addressRouter = void 0;
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const ValidateUser_1 = __importDefault(require("../../middleware/ValidateUser"));
const user_constants_1 = require("../User/user.constants");
const address_controller_1 = require("./address.controller");
const address_validation_1 = require("./address.validation");
const router = (0, express_1.Router)();
// ! for getting user address
router.get("/", (0, ValidateUser_1.default)(user_constants_1.UserRole.user, user_constants_1.UserRole.admin), address_controller_1.addressController.getUserAddress);
// ! for creating address
router.post("/add-user-address", (0, ValidateUser_1.default)(user_constants_1.UserRole.user, user_constants_1.UserRole.admin), (0, validateRequest_1.default)(address_validation_1.addressValidations.addAddressValidationSchema), address_controller_1.addressController.addAddress);
// ! for updating user address
router.patch("/update-user-address/:id", (0, ValidateUser_1.default)(user_constants_1.UserRole.user, user_constants_1.UserRole.admin), (0, validateRequest_1.default)(address_validation_1.addressValidations.updateAddressValidationSchema), address_controller_1.addressController.updateUserAddress);
// ! for deleting user address
router.patch("/delete-user-address/:id", (0, ValidateUser_1.default)(user_constants_1.UserRole.user, user_constants_1.UserRole.admin), address_controller_1.addressController.deleteUserAddress);
//
exports.addressRouter = router;
