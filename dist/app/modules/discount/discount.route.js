"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.discountRouter = void 0;
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const discount_controller_1 = require("./discount.controller");
const discount_validation_1 = require("./discount.validation");
const router = (0, express_1.Router)();
// ! for getting all cupon data
router.get("/all-cupon", discount_controller_1.discountController.getAllCupon);
// ! for getting single cupon
router.get("/:id", discount_controller_1.discountController.getSingleCupon);
// ! for adding cupon
router.post("/add-cupon", (0, validateRequest_1.default)(discount_validation_1.discountValidationSchema.addDiscountValidationSchema), discount_controller_1.discountController.addCupon);
// ! for updating cupon data
router.patch("/update-cupon/:id", discount_controller_1.discountController.updateCuponData);
// ! for deleting cupon data
router.patch("/delete-cupon/:id", discount_controller_1.discountController.deleteCupon);
//
exports.discountRouter = router;
