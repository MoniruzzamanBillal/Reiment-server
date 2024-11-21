import { ObjectId } from "mongoose";
import { PAYMENTSTATUS } from "./payment.constant";

export type TPayment = {
  userId: ObjectId;
  orderId: ObjectId;
  amount: number;
  paymentStatus?: keyof typeof PAYMENTSTATUS;
  transactionId?: string;
  createdAt?: Date;
  updatedAt?: Date;
};
