import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import validateUser from "../../middleware/ValidateUser";
import { UserRole } from "../User/user.constants";
import { reviewController } from "./review.controller";
import { reviewValidationSchema } from "./review.validation";

const router = Router();

// ! for giving review
router.post(
  "/give-review",
  validateUser(UserRole.user),
  validateRequest(reviewValidationSchema.addReviewSchema),
  reviewController.giveReview
);

// ! for updating review
router.patch(
  "/update-review",
  validateUser(UserRole.user),
  reviewController.updateProductReview
);

// ! for getting product review
router.get("/product-review/:id", reviewController.getProductReview);

// ! for checking review eligibility
router.get(
  "/check-review-eligible/:id",
  validateUser(UserRole.user),
  reviewController.checkReviewEligibility
);

//
export const reviewRouter = router;
