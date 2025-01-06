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
exports.discountController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../util/catchAsync"));
const sendResponse_1 = __importDefault(require("../../util/sendResponse"));
const discount_service_1 = require("./discount.service");
// ! for adding cupon
const addCupon = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield discount_service_1.discountServices.addDiscountCupon(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: "Cupon created successfully !!!",
        data: result,
    });
}));
// !  for getting all cupon data
const getAllCupon = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield discount_service_1.discountServices.getAllCuponData();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Cupon data retrived successfully !!!",
        data: result,
    });
}));
//  ! for getting single cupon data
const getSingleCupon = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield discount_service_1.discountServices.getSingleCupon(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Cupon data retrived successfully !!!",
        data: result,
    });
}));
// ! for updating cupon data
const updateCuponData = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield discount_service_1.discountServices.updateCuponData(req.body, req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Cupon data updated successfully !!!",
        data: result,
    });
}));
//   ! for deleting cupon data
const deleteCupon = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield discount_service_1.discountServices.deleteCupon(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Cupon data deleted successfully !!!",
        data: result,
    });
}));
//
exports.discountController = {
    addCupon,
    getAllCupon,
    getSingleCupon,
    updateCuponData,
    deleteCupon,
};
