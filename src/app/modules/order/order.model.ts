import { model, Schema } from "mongoose";
import { orderStatus } from "./order.constant";
import { Toder, TOrderItem } from "./order.interface";

const orderItemSchema = new Schema<TOrderItem>({
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
    required: [true, "Product price is required !!"],
  },
  isReviewed: {
    type: Boolean,
    default: false,
  },
});

const orderSchema = new Schema<Toder>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    discount: {
      type: Schema.Types.ObjectId,
      ref: "Discount",
    },
    address: {
      type: Schema.Types.ObjectId,
      ref: "Address",
      required: true,
    },
    payment: {
      type: Schema.Types.ObjectId,
      ref: "Payment",
    },
    orderItems: [orderItemSchema],
    status: {
      type: String,
      required: true,
      default: orderStatus.pending,
    },
    totalAmount: {
      type: Number,
      required: [true, "Total order amount is required !!"],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

//
orderSchema.pre("find", async function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

orderSchema.pre("findOne", async function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

//
export const orderModel = model<Toder>("Order", orderSchema);
