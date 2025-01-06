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
exports.orderController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../util/catchAsync"));
const sendResponse_1 = __importDefault(require("../../util/sendResponse"));
const order_service_1 = require("./order.service");
// ! for direct order
const createDirectOrderProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.user;
    const result = yield order_service_1.orderServices.directOrderItem(req.body, userId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: "Order placed successfully !!!",
        data: result === null || result === void 0 ? void 0 : result.payment_url,
    });
}));
// ! for ordering from cart
const orderFromCartProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.user;
    const result = yield order_service_1.orderServices.orderFromCart(req.body, userId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: "Order placed successfully !!!",
        data: result === null || result === void 0 ? void 0 : result.payment_url,
    });
}));
// ! for getting all order data
const getAllOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_service_1.orderServices.getAllOrder();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: "Order data retrived  successfully !!!",
        data: result,
    });
}));
// ! for getting user order data
const getUserOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.user;
    const result = yield order_service_1.orderServices.getUserOrder(userId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: "Order retrived successfully !!!",
        data: result,
    });
}));
// ! for getting single order data
const getSingleOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const result = yield order_service_1.orderServices.getSingleOrder((_a = req.params) === null || _a === void 0 ? void 0 : _a.id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: "Order data retrived successfully !!!",
        data: result,
    });
}));
// ! for approving order data
const approveOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_service_1.orderServices.approveOrder(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Order  Approved successfully ",
        data: result,
    });
}));
//  ! for canceling order
const cancelOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_service_1.orderServices.cancelOrder(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Order Canceled successfully ",
        data: result,
    });
}));
//
exports.orderController = {
    createDirectOrderProduct,
    orderFromCartProduct,
    getAllOrder,
    getSingleOrder,
    approveOrder,
    cancelOrder,
    getUserOrder,
};
