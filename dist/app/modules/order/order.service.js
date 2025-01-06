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
exports.orderServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = require("mongoose");
const AppError_1 = __importDefault(require("../../Error/AppError"));
const CheckDataExist_1 = require("../../util/CheckDataExist");
const address_model_1 = require("../address/address.model");
const cart_model_1 = require("../cart/cart.model");
const payment_constant_1 = require("../payment/payment.constant");
const payment_model_1 = require("../payment/payment.model");
const payment_util_1 = require("../payment/payment.util");
const product_model_1 = require("../product/product.model");
const user_model_1 = require("../User/user.model");
const order_constant_1 = require("./order.constant");
const order_model_1 = require("./order.model");
const order_utilFunction_1 = require("./order.utilFunction");
// ! for ordering item
const directOrderItem = (payload, userId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const { product, quantity, price, discount, address } = payload;
    let totalAmount;
    const userData = yield (0, CheckDataExist_1.checkDataExist)(user_model_1.userModel, userId, "This user dont exist !!");
    yield (0, CheckDataExist_1.checkDataExist)(address_model_1.addressModel, address, "This address don't exist !!");
    const productData = yield (0, CheckDataExist_1.checkDataExist)(product_model_1.productModel, product, "This product don't exist !!");
    if ((productData === null || productData === void 0 ? void 0 : productData.stockQuantity) < quantity) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Product stock quantity exceeds !! You can't order this product  ");
    }
    if (discount) {
        const total = quantity * price;
        totalAmount = yield (0, order_utilFunction_1.getTotalAmount)(discount, total);
    }
    else {
        totalAmount = quantity * price;
    }
    const orderItems = [];
    const orderItem = {
        product,
        quantity,
        price,
    };
    orderItems.push(orderItem);
    const session = yield (0, mongoose_1.startSession)();
    try {
        session.startTransaction();
        const orderData = {
            user: userId,
            address,
            orderItems,
            totalAmount,
        };
        if (discount) {
            orderData.discount = discount;
        }
        // * creating order
        const newOrder = yield order_model_1.orderModel.create([orderData], { session });
        const trxnNumber = `TXN-${Date.now()}`;
        const paymentData = {
            userId: userId,
            orderId: (_a = newOrder[0]) === null || _a === void 0 ? void 0 : _a._id,
            amount: totalAmount,
            transactionId: trxnNumber,
            paymentStatus: payment_constant_1.PAYMENTSTATUS.Pending,
        };
        //  * creating payment data
        const paymentResultData = yield payment_model_1.paymentModel.create([paymentData], {
            session,
        });
        // *  Update the Order with Payment Reference
        yield order_model_1.orderModel.updateOne({ _id: (_b = newOrder[0]) === null || _b === void 0 ? void 0 : _b._id }, { payment: (_c = paymentResultData[0]) === null || _c === void 0 ? void 0 : _c._id }, { session });
        // * reducing product stock quantity
        yield product_model_1.productModel.findByIdAndUpdate(product, { $inc: { stockQuantity: -quantity } }, { new: true, session });
        // * initiate payment
        const tracsactionData = {
            transactionId: trxnNumber,
            amount: totalAmount,
            customerName: userData === null || userData === void 0 ? void 0 : userData.name,
            customerEmail: userData === null || userData === void 0 ? void 0 : userData.email,
            userId: userId,
        };
        const transactionResult = yield (0, payment_util_1.initiatePayment)(tracsactionData);
        if (transactionResult === null || transactionResult === void 0 ? void 0 : transactionResult.tran_id) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, transactionResult === null || transactionResult === void 0 ? void 0 : transactionResult.tran_id);
        }
        yield session.commitTransaction();
        yield session.endSession();
        return transactionResult;
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        console.error("Error during order transaction:", error);
        throw new Error("Failed to order item !!");
    }
});
// ! for ordering from cart
const orderFromCart = (payload, userId) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e, _f, _g;
    const { discount, address } = payload;
    let totalAmount;
    const userData = yield (0, CheckDataExist_1.checkDataExist)(user_model_1.userModel, userId, "This user dont exist !!");
    // * check address exists
    yield (0, CheckDataExist_1.checkDataExist)(address_model_1.addressModel, address, "This address don't exist !!");
    const userCartData = yield cart_model_1.cartModel.findOne({ user: userId });
    if (!userCartData) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Cart data doesn't exist !!");
    }
    const total = (_d = userCartData === null || userCartData === void 0 ? void 0 : userCartData.cartItems) === null || _d === void 0 ? void 0 : _d.reduce((sum, item) => sum + (item === null || item === void 0 ? void 0 : item.quantity) * (item === null || item === void 0 ? void 0 : item.price), 0);
    if (discount) {
        totalAmount = yield (0, order_utilFunction_1.getTotalAmount)(discount, total);
    }
    else {
        totalAmount = total;
    }
    const orderItems = [];
    // * for checking product exists and order quantity exceeds
    for (const product of userCartData.cartItems || []) {
        console.log(product);
        const productData = yield (0, CheckDataExist_1.checkDataExist)(product_model_1.productModel, product === null || product === void 0 ? void 0 : product.product, "This product don't exist !!");
        if ((productData === null || productData === void 0 ? void 0 : productData.stockQuantity) < (product === null || product === void 0 ? void 0 : product.quantity)) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Product stock quantity exceeds !! You can't order this product  ");
        }
        orderItems.push(product);
    }
    const session = yield (0, mongoose_1.startSession)();
    try {
        session.startTransaction();
        const orderData = {
            user: userId,
            address,
            orderItems,
            totalAmount,
        };
        if (discount) {
            orderData.discount = discount;
        }
        // * creating order
        const newOrder = yield order_model_1.orderModel.create([orderData], { session });
        const trxnNumber = `TXN-${Date.now()}`;
        const paymentData = {
            userId: userId,
            orderId: (_e = newOrder[0]) === null || _e === void 0 ? void 0 : _e._id,
            amount: totalAmount,
            transactionId: trxnNumber,
            paymentStatus: payment_constant_1.PAYMENTSTATUS.Pending,
        };
        //  * creating payment data
        const paymentResultData = yield payment_model_1.paymentModel.create([paymentData], {
            session,
        });
        // *  Update the Order with Payment Reference
        yield order_model_1.orderModel.updateOne({ _id: (_f = newOrder[0]) === null || _f === void 0 ? void 0 : _f._id }, { payment: (_g = paymentResultData[0]) === null || _g === void 0 ? void 0 : _g._id }, { session });
        // * reducing product stock quantity
        for (const product of userCartData.cartItems || []) {
            yield product_model_1.productModel.findByIdAndUpdate(product === null || product === void 0 ? void 0 : product.product, { $inc: { stockQuantity: -(product === null || product === void 0 ? void 0 : product.quantity) } }, { new: true, session });
        }
        // * removing cart data
        yield cart_model_1.cartModel.findOneAndUpdate({ user: userId }, { isDeleted: true }, { session });
        // * initiate payment
        const tracsactionData = {
            transactionId: trxnNumber,
            amount: totalAmount,
            customerName: userData === null || userData === void 0 ? void 0 : userData.name,
            customerEmail: userData === null || userData === void 0 ? void 0 : userData.email,
            userId: userId,
        };
        const transactionResult = yield (0, payment_util_1.initiatePayment)(tracsactionData);
        if (transactionResult === null || transactionResult === void 0 ? void 0 : transactionResult.tran_id) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, transactionResult === null || transactionResult === void 0 ? void 0 : transactionResult.tran_id);
        }
        yield session.commitTransaction();
        yield session.endSession();
        return transactionResult;
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        console.error("Error during order transaction:", error);
        throw new Error("Failed to order item !!");
    }
});
// ! for approving order
const approveOrder = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const orderData = yield order_model_1.orderModel.findById(id);
    if (!orderData) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Invalid order data !! ");
    }
    const modifiedData = yield order_model_1.orderModel.findByIdAndUpdate(id, { status: order_constant_1.orderStatus.approved }, { new: true, runValidators: true });
    return modifiedData;
});
// ! for canceling order
const cancelOrder = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const orderData = yield order_model_1.orderModel.findById(id);
    if (!orderData) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Invalid order data !! ");
    }
    const session = yield (0, mongoose_1.startSession)();
    try {
        session.startTransaction();
        const modifiedData = yield order_model_1.orderModel.findByIdAndUpdate(id, { status: order_constant_1.orderStatus.canceled }, { new: true, runValidators: true, session });
        for (const orderItem of (orderData === null || orderData === void 0 ? void 0 : orderData.orderItems) || []) {
            yield product_model_1.productModel.findByIdAndUpdate(orderItem === null || orderItem === void 0 ? void 0 : orderItem.product, {
                $inc: { stockQuantity: orderItem === null || orderItem === void 0 ? void 0 : orderItem.quantity },
            }, { new: true, session });
        }
        yield session.commitTransaction();
        yield session.endSession();
        return modifiedData;
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
    }
    //
});
// ! for getting all order data
const getAllOrder = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.orderModel
        .find()
        .populate("address")
        .populate({
        path: "user",
        select: " -userRole -status -createdAt -updatedAt -password -isDeleted ",
    })
        .populate({
        path: "orderItems.product",
        select: " -createdAt -updatedAt  -isDeleted -stockQuantity ",
    })
        .populate({
        path: "payment",
        select: " -createdAt -updatedAt -userId -orderId -__v ",
    })
        .sort({ status: (order_constant_1.orderStatus === null || order_constant_1.orderStatus === void 0 ? void 0 : order_constant_1.orderStatus.pending) ? -1 : 1 });
    return result;
});
// ! for getting single order
const getSingleOrder = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const orderData = yield order_model_1.orderModel
        .findById(id)
        .populate("address user")
        .populate({
        path: "orderItems.product",
        select: " -createdAt -updatedAt  -isDeleted -stockQuantity ",
    })
        .populate({
        path: "payment",
        select: " -createdAt -updatedAt -userId -orderId -__v ",
    });
    if (!orderData) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Invalid order id !!!");
    }
    return orderData;
});
// ! for getring all user order
const getUserOrder = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.orderModel
        .find({ user: userId })
        .populate({
        path: "user",
        select: " -userRole -status -createdAt -updatedAt -password -isDeleted ",
    })
        .populate({
        path: "orderItems.product",
        select: " -createdAt -updatedAt  -isDeleted -stockQuantity ",
    })
        .populate({
        path: "payment",
        select: " -createdAt -updatedAt -userId -orderId -__v ",
    })
        .sort({ status: (order_constant_1.orderStatus === null || order_constant_1.orderStatus === void 0 ? void 0 : order_constant_1.orderStatus.pending) ? -1 : 1 });
    return result;
});
//
exports.orderServices = {
    directOrderItem,
    orderFromCart,
    approveOrder,
    getAllOrder,
    cancelOrder,
    getSingleOrder,
    getUserOrder,
};
