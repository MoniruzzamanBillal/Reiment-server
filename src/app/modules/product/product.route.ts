import { NextFunction, Request, Response, Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { upload } from "../../util/SendImageCloudinary";
import { productController } from "./product.controller";
import { productValidationSchema } from "./product.validation";

const router = Router();

// ! for getting all products
router.get("/all-products", productController.getAllProducts);

// ! for creating product
router.post(
  "/create-product",
  upload.single("prodImg"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(productValidationSchema.createProduct),
  productController.createProduct
);

// ! for getting all recent
router.patch("/recent-products", productController.getRecentProducts);

// ! for getting single product
router.get("/:id", productController.getSingleProducts);

// ! for updating  product
router.patch(
  "/:id",
  upload.single("prodImg"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(productValidationSchema.updateProduct),
  productController.updateProduct
);

// ! for deleting  product
router.patch("/delete/:id", productController.deleteSingleProduct);

//
export const productRouter = router;
