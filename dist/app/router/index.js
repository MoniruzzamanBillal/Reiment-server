"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainRouter = void 0;
const express_1 = require("express");
const auth_route_1 = require("../modules/auth/auth.route");
const address_route_1 = require("../modules/address/address.route");
const cart_route_1 = require("../modules/cart/cart.route");
const discount_route_1 = require("../modules/discount/discount.route");
const order_route_1 = require("../modules/order/order.route");
const payment_route_1 = require("../modules/payment/payment.route");
const product_route_1 = require("../modules/product/product.route");
const review_route_1 = require("../modules/review/review.route");
const user_route_1 = require("../modules/User/user.route");
const router = (0, express_1.Router)();
const routeArray = [
    {
        path: "/users",
        route: user_route_1.userRouter,
    },
    {
        path: "/auth",
        route: auth_route_1.authRouter,
    },
    {
        path: "/product",
        route: product_route_1.productRouter,
    },
    {
        path: "/cart",
        route: cart_route_1.cartRouter,
    },
    {
        path: "/address",
        route: address_route_1.addressRouter,
    },
    {
        path: "/order",
        route: order_route_1.orderRouter,
    },
    {
        path: "/payment",
        route: payment_route_1.paymentRouter,
    },
    {
        path: "/cupon",
        route: discount_route_1.discountRouter,
    },
    {
        path: "/review",
        route: review_route_1.reviewRouter,
    },
];
routeArray.forEach((item) => {
    router.use(item.path, item.route);
});
exports.MainRouter = router;
