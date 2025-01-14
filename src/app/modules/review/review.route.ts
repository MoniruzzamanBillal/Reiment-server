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

// ! for checking review eligibility
router.post(
  "/check-review-eligible",
  validateUser(UserRole.user),
  reviewController.checkReviewEligibility
);

//
export const reviewRouter = router;
