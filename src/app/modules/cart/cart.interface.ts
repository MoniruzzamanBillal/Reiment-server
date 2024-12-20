import { Types } from "mongoose";

export type TCartItem = {
  product: Types.ObjectId;
  quantity: number;
  price: number;
};

export type TCart = {
  user: Types.ObjectId;
  cartItems: TCartItem[];
  isDeleted: boolean;
};

export type ICart = {
  userId: string;
  productId: string;
  quantity: number;
  price: number;
};
