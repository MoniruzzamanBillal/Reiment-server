import { Types } from "mongoose";

export type TReview = {
  userId: Types.ObjectId;
  productId: Types.ObjectId;
  rating: number;
  comment: string;
  isDeleted?: boolean;
};
