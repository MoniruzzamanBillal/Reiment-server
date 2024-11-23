import { TReview } from "./review.interface";
import { reviewModel } from "./review.model";

// ! for giving review
const addReview = async (payload: TReview) => {
  console.log(payload);
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
