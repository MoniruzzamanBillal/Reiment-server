import { Types } from "mongoose";
import { deliveryStatus, orderStatus } from "./order.constant";

export type TOrderItem = {
  _id?: string;
  product: Types.ObjectId;
  quantity: number;
  price: number;
  isReviewed?: boolean;
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
  isDeleted: boolean;
  isReviewed: boolean;
  orderStatus: keyof typeof orderStatus;
  orderItems: TOrderItem[];
  delivery: Tdelivery;
  discount: Types.ObjectId;
  payment: Types.ObjectId;
  status: string;
};

export type TDirectOrder = {
  product: Types.ObjectId;
  quantity: number;
  price: number;
  address: Types.ObjectId;
  discount?: Types.ObjectId;
};

export type TCartOrder = {
  address: Types.ObjectId;
  discount?: Types.ObjectId;
};
