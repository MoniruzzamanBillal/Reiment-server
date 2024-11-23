import httpStatus from "http-status";
import { startSession, Types } from "mongoose";
import AppError from "../../Error/AppError";
import { checkDataExist } from "../../util/CheckDataExist";
import { addressModel } from "../address/address.model";
import { PAYMENTSTATUS } from "../payment/payment.constant";
import { paymentModel } from "../payment/payment.model";
import { initiatePayment } from "../payment/payment.util";
import { productModel } from "../product/product.model";
import { userModel } from "../User/user.model";
import { TDirectOrder, TOrderItem } from "./order.interface";
import { orderModel } from "./order.model";
import { getTotalAmount } from "./order.utilFunction";

// ! for ordering item
const directOrderItem = async (payload: TDirectOrder, userId: string) => {
  const { product, quantity, price, discount, address } = payload;

  let totalAmount;

  const userData = await checkDataExist(
    userModel,
    userId,
    "This user dont exist !!"
  );

  await checkDataExist(addressModel, address, "This address don't exist !!");

  const productData = await checkDataExist(
    productModel,
    product,
    "This product don't exist !!"
  );

  if (productData?.stockQuantity < quantity) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Product stock quantity exceeds !! You can't order this product  "
    );
  }

  if (discount) {
    totalAmount = await getTotalAmount(discount, quantity, price);
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

    const orderData: {
      user: string;
      address: Types.ObjectId;
      orderItems: TOrderItem[];
      totalAmount: number;
      discount?: Types.ObjectId;
    } = {
      user: userId,
      address,
      orderItems,
      totalAmount,
    };

    if (discount) {
      orderData.discount = discount;
    }

    // * creating order
    const newOrder = await orderModel.create([orderData], { session });

    const trxnNumber = `TXN-${Date.now()}`;
    const paymentData = {
      userId: userId,
      orderId: newOrder[0]?._id,
      amount: totalAmount as number,
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

    // * reducing product stock quantity
    await productModel.findByIdAndUpdate(
      product,
      { $inc: { stockQuantity: -quantity } },
      { new: true, session }
    );

    // * initiate payment
    const tracsactionData = {
      transactionId: trxnNumber,
      amount: totalAmount as number,
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
    console.error("Error during order transaction:", error);

    throw new Error("Failed to order item !!");
  }
};

//
export const orderServices = {
  directOrderItem,
};
