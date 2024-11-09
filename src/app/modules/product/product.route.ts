import { NextFunction, Request, Response, Router } from "express";
import { upload } from "../../util/SendImageCloudinary";
import { productController } from "./product.controller";

const router = Router();

// ! for getting all products
router.get("/all-products", productController.getAllProducts);

// ! for creating product
router.post(
  "/create-product",
  upload.array("images", 10),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  productController.createProduct
);

//
export const productRouter = router;
