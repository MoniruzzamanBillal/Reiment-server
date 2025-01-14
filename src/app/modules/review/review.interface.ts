export type TReview = {
  userId: string;
  productId: string;
  rating: number;
  comment: string;
  isDeleted?: boolean;
};
