import { model, Schema } from "mongoose";
import { TCart, TCartItem } from "./cart.interface";

const cartItemSchema = new Schema<TCartItem>({
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: [true, "Product is required !!"],
  },
  quantity: {
    type: Number,
    required: [true, "Product quantity is required !!"],
    min: 1,
  },
  price: {
    type: Number,
    required: true,
  },
});

const cartSchema = new Schema<TCart>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    cartItems: [cartItemSchema],
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

cartSchema.pre("find", async function (next) {
  this.find({ isDeleted: { $ne: true } });

  next();
});

cartSchema.pre("findOne", async function (next) {
  this.find({ isDeleted: { $ne: true } });

  next();
});

//
export const cartModel = model<TCart>("Cart", cartSchema);
