import httpStatus from "http-status";
import { Types } from "mongoose";
import AppError from "../../Error/AppError";
import { discountModel } from "../discount/discount.model";

export const getTotalAmount = async (
  discount: Types.ObjectId,
  quantity: number,
  price: number
): Promise<number> => {
  const today = new Date();
  const discountData = await discountModel.findById(discount);

  if (!discountData) {
    throw new AppError(httpStatus.BAD_REQUEST, "this cupon doesn't exist !!");
  }

  const expireDate = new Date(discountData?.expiryDate as string);

  if (expireDate <= today) {
    throw new AppError(httpStatus.BAD_REQUEST, " This cupon is expired !!");
  }

  const total = quantity * price;
  const discountAmount = total * (discountData?.percentage / 100);

  const totalAmount = total - discountAmount;

  return totalAmount;
};
