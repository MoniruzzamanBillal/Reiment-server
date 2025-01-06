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
exports.productController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../util/catchAsync"));
const sendResponse_1 = __importDefault(require("../../util/sendResponse"));
const product_service_1 = require("./product.service");
// ! for creating product
const createProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_service_1.productServices.createProduct(req.body, req.file);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Product created successfully !!!",
        data: result,
    });
}));
// ! for updating a product
const updateProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const result = yield product_service_1.productServices.updateProduct(req.body, req.file, (_a = req.params) === null || _a === void 0 ? void 0 : _a.id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Product updated successfully !!!",
        data: result,
    });
}));
// ! for getting all products
const getAllProducts = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_service_1.productServices.getAllProducts(req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "All Product retrived successfully !!!",
        data: result,
    });
}));
// ! for getting all recent
const getRecentProducts = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_service_1.productServices.getRecentProducts(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Recent Product retrived successfully !!!",
        data: result,
    });
}));
// ! for getting single products
const getSingleProducts = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const result = yield product_service_1.productServices.getSingleProduct((_b = req.params) === null || _b === void 0 ? void 0 : _b.id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Product retrived successfully !!!",
        data: result,
    });
}));
// ! for deleting products
const deleteSingleProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const result = yield product_service_1.productServices.deleteProduct((_c = req.params) === null || _c === void 0 ? void 0 : _c.id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Product deleted successfully !!!",
        data: result,
    });
}));
//
exports.productController = {
    createProduct,
    getAllProducts,
    getSingleProducts,
    updateProduct,
    deleteSingleProduct,
    getRecentProducts,
};
