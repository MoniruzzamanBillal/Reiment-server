import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { discountController } from "./discount.controller";
import { discountValidationSchema } from "./discount.validation";

const router = Router();

// ! for getting all cupon data
router.get("/all-cupon", discountController.getAllCupon);

// ! for getting single cupon
router.get("/:id", discountController.getSingleCupon);

// ! for adding cupon
router.post(
  "/add-cupon",
  validateRequest(discountValidationSchema.addDiscountValidationSchema),
  discountController.addCupon
);

// ! for updating cupon data
router.patch("/update-cupon/:id", discountController.updateCuponData);

// ! for deleting cupon data
router.patch("/delete-cupon/:id", discountController.deleteCupon);

//
export const discountRouter = router;
