import httpStatus from "http-status";
import { startSession } from "mongoose";
import AppError from "../../Error/AppError";
import { addressModel } from "../address/address.model";
import { discountModel } from "../discount/discount.model";
import { PAYMENTSTATUS } from "../payment/payment.constant";
import { paymentModel } from "../payment/payment.model";
import { initiatePayment } from "../payment/payment.util";
import { productModel } from "../product/product.model";
import { userModel } from "../User/user.model";
import { TDirectOrder } from "./order.interface";
import { orderModel } from "./order.model";

// ! for ordering item
const directOrderItem = async (payload: TDirectOrder, userId: string) => {
  const { product, quantity, price, discount, address } = payload;

  let totalAmount;
  const userData = await userModel.findById(userId);
  const userAddress = await addressModel.findById(address);
  const productData = await productModel.findById(product);

  console.log("product data = ", productData);

  if (!userData) {
    throw new AppError(httpStatus.BAD_REQUEST, "this user dont exist !!");
  }

  if (userData?.isDeleted) {
    throw new AppError(httpStatus.BAD_REQUEST, "this user is deleted  !!");
  }
  if (!userAddress) {
    throw new AppError(httpStatus.BAD_REQUEST, "this address dont exist !!");
  }

  if (!productData) {
    throw new AppError(httpStatus.BAD_REQUEST, "this product dont exist !!");
  }

  if (discount) {
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

    totalAmount = total - discountAmount;
  } else {
    totalAmount = quantity * price;
  }

  const orderItems = [];

  const orderItem = {
    product,
    quantity,
    price,
  };

  orderItems.push(orderItem);

  const session = await startSession();

  try {
    session.startTransaction();

    let orderData;
    if (discount) {
      orderData = {
        user: userId,
        discount,
        address,
        orderItems,
        totalAmount,
      };
    } else {
      orderData = {
        user: userId,
        address,
        orderItems,
        totalAmount,
      };
    }

    // * creating order
    const newOrder = await orderModel.create([orderData], { session });

    const trxnNumber = `TXN-${Date.now()}`;
    const paymentData = {
      userId: userId,
      orderId: newOrder[0]?._id,
      amount: totalAmount,
      transactionId: trxnNumber,
      paymentStatus: PAYMENTSTATUS.Pending,
    };

    //  * creating payment data
    const paymentResultData = await paymentModel.create([paymentData], {
      session,
    });

    // *  Update the Order with Payment Reference
    await orderModel.updateOne(
      { _id: newOrder[0]?._id },
      { payment: paymentResultData[0]?._id },
      { session }
    );

    // * initiate payment
    const tracsactionData = {
      transactionId: trxnNumber,
      amount: totalAmount,
      customerName: userData?.name,
      customerEmail: userData?.email,
      userId: userId,
    };

    const transactionResult = await initiatePayment(tracsactionData);

    if (transactionResult?.tran_id) {
      throw new AppError(httpStatus.BAD_REQUEST, transactionResult?.tran_id);
    }

    await session.commitTransaction();
    await session.endSession();

    return transactionResult;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();

    throw new Error("Failed to order item !!");
  }
};

//
export const orderServices = {
  directOrderItem,
};
