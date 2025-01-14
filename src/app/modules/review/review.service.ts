import httpStatus from "http-status";
import { startSession } from "mongoose";
import AppError from "../../Error/AppError";
import { checkDataExist } from "../../util/CheckDataExist";
import { orderModel } from "../order/order.model";
import { productModel } from "../product/product.model";
import { userModel } from "../User/user.model";
import { TReview } from "./review.interface";
import { reviewModel } from "./review.model";

// ! for giving review
const addReview = async (payload: TReview) => {
  const { userId, productId } = payload;

  await checkDataExist(userModel, userId, "This user doesn't exist !!");

  await checkDataExist(
    productModel,
    productId,
    "This product doesn't exist !!"
  );

  const orderData = await orderModel.findOne({
    user: userId,
    "orderItems.product": productId,
    "orderItems.isReviewed": false,
  });

  console.log(orderData);

  const orderItem = orderData?.orderItems?.find(
    (item) => item?.product?.toString() === productId && !item?.isReviewed
  );

  if (!orderItem) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "you did not order this product !!!"
    );
  }

  const session = await startSession();

  try {
    session.startTransaction();

    // ! create review
    await reviewModel.create([payload], { session });

    // ! change the order item review status
    await orderModel.updateOne(
      { _id: orderData?._id, "orderItems._id": orderItem?._id },
      { $set: { "orderItems.$.isReviewed": true } },
      { session }
    );

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    console.error("Error during review transaction:", error);

    throw new Error("Failed to give review!!");
  }
};

// ! check review eligibility
const checkReviewEligibility = async (productId: string, userId: string) => {
  const orderData = await orderModel.findOne({
    user: userId,
    "orderItems.product": productId,
    "orderItems.isReviewed": false,
  });

  const orderItem = orderData?.orderItems?.find(
    (item) => item?.product?.toString() === productId && !item?.isReviewed
  );

  return orderItem;
};

// ! for getting all review
const getAllReview = async () => {
  const result = await reviewModel.find();

  return result;
};

// ! for getting user review
const getUserReview = async (userId: string) => {
  const result = await reviewModel.find({ userId });
  return result;
};

// ! for getting product review
const getProductReview = async (productId: string) => {
  const result = await reviewModel.find({ productId }).populate("userId");
  return result;
};

//
export const reviewServices = {
  addReview,
  getAllReview,
  getUserReview,
  checkReviewEligibility,
  getProductReview,
};
