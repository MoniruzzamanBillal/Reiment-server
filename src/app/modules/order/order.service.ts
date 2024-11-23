import httpStatus from "http-status";
import AppError from "../../Error/AppError";
import { addressModel } from "../address/address.model";
import { discountModel } from "../discount/discount.model";
import { userModel } from "../User/user.model";
import { TDirectOrder } from "./order.interface";

// ! for ordering item
const directOrderItem = async (payload: TDirectOrder, userId: string) => {
  const { product, quantity, price, discount, address } = payload;

  const userData = await userModel.findById(userId);
  const userAddress = await addressModel.findById(address);
  const discountData = await discountModel.findById(discount);

  if (!userData) {
    throw new AppError(httpStatus.BAD_REQUEST, "this user dont exist !!");
  }

  if (userData?.isDeleted) {
    throw new AppError(httpStatus.BAD_REQUEST, "this user is deleted  !!");
  }
  if (!userAddress) {
    throw new AppError(httpStatus.BAD_REQUEST, "this address dont exist !!");
  }

  let totalAmount;

  console.log(discountData);

  console.log(payload);
  console.log(userId);
};

//
export const orderServices = {
  directOrderItem,
};
