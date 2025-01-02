import { model, Schema } from "mongoose";
import { TProduct } from "./product.interface";

const productSchema = new Schema<TProduct>(
  {
    name: {
      type: String,
      required: [true, "product name is required "],
    },
    detail: {
      type: String,
      required: [true, "product detail is required "],
    },
    price: {
      type: Number,
      required: [true, "product price is required "],
    },
    size: {
      type: [String],
      required: [true, "product size is required "],
      enum: ["M", "L", "XL", "XXL"],
    },
    color: {
      type: [String],
      required: [true, "product color is required "],
    },
    material: {
      type: String,
      required: [true, "product material is required "],
    },
    stockQuantity: {
      type: Number,
      required: [true, "product stock quantity is required "],
    },
    productImage: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

productSchema.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "productId",
});

productSchema.pre("find", async function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

productSchema.pre("findOne", async function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

//
export const productModel = model<TProduct>("Product", productSchema);
