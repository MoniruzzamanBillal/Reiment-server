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
exports.cartController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../util/catchAsync"));
const sendResponse_1 = __importDefault(require("../../util/sendResponse"));
const cart_service_1 = require("./cart.service");
// ! for adding new cart , update item quantity
const addToCart = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cart_service_1.cartServices.addUpdateCart(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Item added to  successfully !!!",
        data: result,
    });
}));
// ! for getting all user cart data
const getUserCart = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.user;
    const result = yield cart_service_1.cartServices.getUserCart(userId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "User cart item retrived successfully !!!",
        data: result,
    });
}));
// ! for adding item in cart
const addCartItem = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.user;
    const result = yield cart_service_1.cartServices.addingCartItem(req.body, userId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Item added to cart successfully !!!",
        data: result,
    });
}));
// ! for removing item in cart
const removeCartItem = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { userId } = req.user;
    const result = yield cart_service_1.cartServices.removeCartItem((_a = req.body) === null || _a === void 0 ? void 0 : _a.productId, userId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Item removed from cart successfully !!!",
        data: result,
    });
}));
// ! for adding cart item quantity
const addCartItemQuantity = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.user;
    const result = yield cart_service_1.cartServices.addCartItemQuantity(req.body, userId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: " Item quantity increased successfully !!!",
        data: result,
    });
}));
// ! for adding cart item quantity
const decreaseCartItemQuantity = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.user;
    const result = yield cart_service_1.cartServices.decreaseCartItemQuantity(req.body, userId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: " Item quantity decreased successfully !!!",
        data: result,
    });
}));
//
exports.cartController = {
    addToCart,
    getUserCart,
    addCartItem,
    removeCartItem,
    addCartItemQuantity,
    decreaseCartItemQuantity,
};
