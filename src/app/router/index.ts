import { Router } from "express";
import { authRouter } from "../modules/auth/auth.route";
import { testRouter } from "../modules/boilerModule/test.route";
import { productRouter } from "../modules/product/product.route";
import { userRouter } from "../modules/User/user.route";

const router = Router();

const routeArray = [
  {
    path: "/test",
    route: testRouter,
  },
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
];

routeArray.forEach((item) => {
  router.use(item.path, item.route);
});

export const MainRouter = router;
