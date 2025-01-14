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
    req?.params?.id,
    req.user?.userId
  );

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: " eligibility !!!",
    data: result,
  });
});

// ! for getting all review
const getAllReview = catchAsync(async (req, res) => {
  const result = await reviewServices.getAllReview();

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Review retrived successfully !!!",
    data: result,
  });
});

// ! for getting product review
const getProductReview = catchAsync(async (req, res) => {
  const result = await reviewServices.getProductReview(req?.params?.id);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Product Review retrived successfully !!!",
    data: result,
  });
});

//
export const reviewController = {
  giveReview,
  checkReviewEligibility,
  getAllReview,
  getProductReview,
};
