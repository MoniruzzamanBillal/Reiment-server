"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRouter = void 0;
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const SendImageCloudinary_1 = require("../../util/SendImageCloudinary");
const product_controller_1 = require("./product.controller");
const product_validation_1 = require("./product.validation");
const router = (0, express_1.Router)();
// ! for getting all products
router.get("/all-products", product_controller_1.productController.getAllProducts);
// ! for creating product
router.post("/create-product", SendImageCloudinary_1.upload.single("prodImg"), (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
}, (0, validateRequest_1.default)(product_validation_1.productValidationSchema.createProduct), product_controller_1.productController.createProduct);
// ! for getting all recent
router.patch("/recent-products", product_controller_1.productController.getRecentProducts);
// ! for getting single product
router.get("/:id", product_controller_1.productController.getSingleProducts);
// ! for updating  product
router.patch("/:id", SendImageCloudinary_1.upload.single("prodImg"), (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
}, (0, validateRequest_1.default)(product_validation_1.productValidationSchema.updateProduct), product_controller_1.productController.updateProduct);
// ! for deleting  product
router.patch("/delete/:id", product_controller_1.productController.deleteSingleProduct);
//
exports.productRouter = router;
