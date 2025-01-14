import httpStatus from "http-status";
import catchAsync from "../../util/catchAsync";
import sendResponse from "../../util/sendResponse";
import { reviewServices } from "./review.service";

// ! for giving review
const giveReview = catchAsync(async (req, res) => {
  const result = await reviewServices.addReview(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Review posted successfully !!!",
    data: result,
  });
});

// ! for checkint eligibility of the review
const checkReviewEligibility = catchAsync(async (req, res) => {
  const result = await reviewServices.checkReviewEligibility(
    req.body?.productId,
    req.user?.userId
  );

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: " eligibility !!!",
    data: result,
  });
});

//
export const reviewController = {
  giveReview,
  checkReviewEligibility,
};
