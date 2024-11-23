import { checkDataExist } from "../../util/CheckDataExist";
import { orderModel } from "../order/order.model";
import { productModel } from "../product/product.model";
import { userModel } from "../User/user.model";
import { TReview } from "./review.interface";
import { reviewModel } from "./review.model";

// ! for giving review
const addReview = async (payload: TReview) => {
  const { userId, productId, purchaseId } = payload;

  await checkDataExist(userModel, userId, "This user doesn't exist !!");

  await checkDataExist(
    productModel,
    productId,
    "This product doesn't exist !!"
  );

  await checkDataExist(
    orderModel,
    purchaseId,
    "This purchase id doesn't exist !!"
  );

  const result = await reviewModel.create(payload);

  return result;
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

//
export const reviewServices = {
  addReview,
  getAllReview,
  getUserReview,
};
