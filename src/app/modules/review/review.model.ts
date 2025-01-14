import { model, Schema } from "mongoose";
import { TReview } from "./review.interface";

const reviewSchema = new Schema<TReview>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required "],
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "User is required "],
    },
    rating: {
      type: Number,
      required: [true, "Rating is required !!"],
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: [true, "Comment is required !!"],
    },
  },
  { timestamps: true }
);

reviewSchema.pre("find", async function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

reviewSchema.pre("findOne", async function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

//
export const reviewModel = model<TReview>("Review", reviewSchema);
