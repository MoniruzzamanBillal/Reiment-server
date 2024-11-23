import { Router } from "express";
import { authRouter } from "../modules/auth/auth.route";

import { addressRouter } from "../modules/address/address.route";
import { cartRouter } from "../modules/cart/cart.route";
import { discountRouter } from "../modules/discount/discount.route";
import { orderRouter } from "../modules/order/order.route";
import { paymentRouter } from "../modules/payment/payment.route";
import { productRouter } from "../modules/product/product.route";
import { userRouter } from "../modules/User/user.route";

const router = Router();

const routeArray = [
  {
    path: "/users",
    route: userRouter,
  },
  {
    path: "/auth",
    route: authRouter,
  },
  {
    path: "/product",
    route: productRouter,
  },
  {
    path: "/cart",
    route: cartRouter,
  },
  {
    path: "/address",
    route: addressRouter,
  },
  {
    path: "/order",
    route: orderRouter,
  },
  {
    path: "/payment",
    route: paymentRouter,
  },
  {
    path: "/cupon",
    route: discountRouter,
  },
];

routeArray.forEach((item) => {
  router.use(item.path, item.route);
});

export const MainRouter = router;
