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
exports.cartServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = require("mongoose");
const AppError_1 = __importDefault(require("../../Error/AppError"));
const product_model_1 = require("../product/product.model");
const cart_model_1 = require("./cart.model");
// ! for getting user cart data
const getUserCart = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cart_model_1.cartModel.findOne({ user: userId }).populate({
        path: "cartItems.product",
        select: " -detail -size -color -material -isDeleted -createdAt -updatedAt -updatedAt -__v ",
    });
    return result;
});
// ! for creating a cart
const addUpdateCart = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, productId, quantity, price } = payload;
    const cart = yield cart_model_1.cartModel.findOne({ user: userId });
    if (cart) {
        const existCartItemIndex = cart.cartItems.findIndex((item) => (item === null || item === void 0 ? void 0 : item.product.toString()) === productId);
        if (existCartItemIndex > -1) {
            cart.cartItems[existCartItemIndex].quantity += quantity;
        }
        else {
            cart.cartItems.push({
                product: new mongoose_1.Types.ObjectId(productId),
                quantity: quantity,
                price: price,
            });
        }
        yield cart.save();
        return cart;
    }
    else {
        const newCart = yield cart_model_1.cartModel.create({
            user: userId,
            cartItems: [{ product: productId, quantity, price }],
        });
        return newCart;
    }
});
// ! for adding cart item
const addingCartItem = (payload, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId, quantity, price } = payload;
    const userCartData = yield cart_model_1.cartModel.findOne({ user: userId });
    const productExist = yield product_model_1.productModel.findById(productId);
    if (!productExist) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Product don't exist !!");
    }
    if (!userCartData) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "User cart dont exist !!");
    }
    const productIndex = userCartData.cartItems.findIndex((item) => (item === null || item === void 0 ? void 0 : item.product.toString()) === productId);
    if (productIndex > -1) {
        userCartData.cartItems[productIndex].quantity += quantity;
    }
    else {
        userCartData.cartItems.push({
            product: new mongoose_1.Types.ObjectId(productId),
            quantity: quantity,
            price: price,
        });
    }
    yield userCartData.save();
    return userCartData;
});
// ! for removing cart item
const removeCartItem = (productId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userCartData = yield cart_model_1.cartModel.findOne({ user: userId });
    const productExist = yield product_model_1.productModel.findById(productId);
    if (!productExist) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Product don't exist !!");
    }
    if (!userCartData) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "User cart dont exist !!");
    }
    userCartData.cartItems = (_a = userCartData.cartItems) === null || _a === void 0 ? void 0 : _a.filter((item) => (item === null || item === void 0 ? void 0 : item.product.toString()) !== productId);
    yield userCartData.save();
    return userCartData;
});
// ! for adding cart  item quantity
const addCartItemQuantity = (payload, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId, quantity } = payload;
    const userCartData = yield cart_model_1.cartModel.findOne({ user: userId });
    const productExist = yield product_model_1.productModel.findById(productId);
    if (!productExist) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Product don't exist !!");
    }
    if (!userCartData) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "User cart dont exist !!");
    }
    const productIndex = userCartData.cartItems.findIndex((item) => (item === null || item === void 0 ? void 0 : item.product.toString()) === productId);
    if (productIndex <= -1) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "This item don't exist in your cart !!");
    }
    if (userCartData.cartItems[productIndex].quantity + quantity >
        (productExist === null || productExist === void 0 ? void 0 : productExist.stockQuantity)) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Product stock quantity exceeds !! You can't add this product  ");
    }
    userCartData.cartItems[productIndex].quantity += quantity;
    yield userCartData.save();
    return userCartData;
});
// ! for decreasing cart item quantity
const decreaseCartItemQuantity = (payload, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId, quantity } = payload;
    const userCartData = yield cart_model_1.cartModel.findOne({ user: userId });
    const productExist = yield product_model_1.productModel.findById(productId);
    if (!productExist) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Product don't exist !!");
    }
    if (!userCartData) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "User cart dont exist !!");
    }
    const productIndex = userCartData.cartItems.findIndex((item) => (item === null || item === void 0 ? void 0 : item.product.toString()) === productId);
    if (productIndex <= -1) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "This item don't exist in your cart !!");
    }
    userCartData.cartItems[productIndex].quantity -= quantity;
    yield userCartData.save();
    return userCartData;
});
//
exports.cartServices = {
    addUpdateCart,
    getUserCart,
    addingCartItem,
    removeCartItem,
    addCartItemQuantity,
    decreaseCartItemQuantity,
};
