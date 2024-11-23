import { model, Schema } from "mongoose";
import { TDiscount } from "./discount.interface";

const discountSchema = new Schema<TDiscount>(
  {
    code: {
      type: String,
      required: true,
      unique: true,
    },
    percentage: {
      type: Number,
      required: true,
      min: 0,
      max: 90,
    },
    expiryDate: {
      type: String,
      required: [true, "Expiry date is required !!!"],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

discountSchema.pre("find", async function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

discountSchema.pre("findOne", async function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

//
export const discountModel = model<TDiscount>("Discount", discountSchema);
