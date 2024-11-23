import { model, Schema } from "mongoose";
import { TReview } from "./review.interface";

const reviewSchema = new Schema<TReview>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: [true, "User is required "],
    },
    productId: {
      type: Schema.Types.ObjectId,
      required: [true, "User is required "],
    },
    purchaseId: {
      type: Schema.Types.ObjectId,
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

reviewSchema.index(
  { userId: 1, productId: 1, purchaseId: 1 },
  { unique: true }
);

reviewSchema.pre("find", async function (next) {
  this.find({ isDeleted: { $ne: false } });
  next();
});

reviewSchema.pre("findOne", async function (next) {
  this.find({ isDeleted: { $ne: false } });
  next();
});

//
export const reviewModel = model<TReview>("Review", reviewSchema);
