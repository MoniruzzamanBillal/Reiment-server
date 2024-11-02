import { Router } from "express";
import { testRouter } from "../modules/boilerModule/test.route";
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
];

routeArray.forEach((item) => {
  router.use(item.path, item.route);
});

export const MainRouter = router;
