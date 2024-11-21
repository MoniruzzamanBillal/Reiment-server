import { Types } from "mongoose";
import { deliveryStatus, orderStatus } from "./order.constant";

export type TOrderItem = {
  product: Types.ObjectId;
  quantity: number;
  price: number;
};

export type Tdelivery = {
  trackingNumber: number;
  deliveryStatus: keyof typeof deliveryStatus;
  deliveryDate?: string;
};

export type Toder = {
  user: Types.ObjectId;
  address: Types.ObjectId;
  totalAmount: number;
  orderStatus: keyof typeof orderStatus;
  orderItems: TOrderItem[];
  delivery: Tdelivery;
  discounts: Types.ObjectId;
};
