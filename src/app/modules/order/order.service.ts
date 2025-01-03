import httpStatus from "http-status";
import { startSession, Types } from "mongoose";
import AppError from "../../Error/AppError";
import { checkDataExist } from "../../util/CheckDataExist";
import { addressModel } from "../address/address.model";
import { cartModel } from "../cart/cart.model";
import { PAYMENTSTATUS } from "../payment/payment.constant";
import { paymentModel } from "../payment/payment.model";
import { initiatePayment } from "../payment/payment.util";
import { productModel } from "../product/product.model";
import { userModel } from "../User/user.model";
import { orderStatus } from "./order.constant";
import { TCartOrder, TDirectOrder, TOrderItem } from "./order.interface";
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
    const total = quantity * price;
    totalAmount = await getTotalAmount(discount, total);
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

// ! for ordering from cart
const orderFromCart = async (payload: TCartOrder, userId: string) => {
  const { discount, address } = payload;

  let totalAmount;

  const userData = await checkDataExist(
    userModel,
    userId,
    "This user dont exist !!"
  );

  // * check address exists
  await checkDataExist(addressModel, address, "This address don't exist !!");

  const userCartData = await cartModel.findOne({ user: userId });

  if (!userCartData) {
    throw new AppError(httpStatus.BAD_REQUEST, "Cart data doesn't exist !!");
  }

  const total = userCartData?.cartItems?.reduce(
    (sum, item) => sum + item?.quantity * item?.price,
    0
  );

  if (discount) {
    totalAmount = await getTotalAmount(discount, total as number);
  } else {
    totalAmount = total;
  }

  const orderItems = [];

  // * for checking product exists and order quantity exceeds
  for (const product of userCartData!.cartItems || []) {
    console.log(product);

    const productData = await checkDataExist(
      productModel,
      product?.product,
      "This product don't exist !!"
    );

    if (productData?.stockQuantity < product?.quantity) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Product stock quantity exceeds !! You can't order this product  "
      );
    }

    orderItems.push(product);
  }

  const session = await startSession();

  try {
    session.startTransaction();
    const orderData: {
      user: string;
      address: Types.ObjectId;
      orderItems: TOrderItem[];
      totalAmount: number | undefined;
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
    for (const product of userCartData!.cartItems || []) {
      await productModel.findByIdAndUpdate(
        product?.product,
        { $inc: { stockQuantity: -product?.quantity } },
        { new: true, session }
      );
    }

    // * removing cart data
    await cartModel.findOneAndUpdate(
      { user: userId },
      { isDeleted: true },
      { session }
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

// ! for approving order
const approveOrder = async (id: string) => {
  const orderData = await orderModel.findById(id);

  if (!orderData) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid order data !! ");
  }

  const modifiedData = await orderModel.findByIdAndUpdate(
    id,
    { status: orderStatus.approved },
    { new: true, runValidators: true }
  );

  return modifiedData;
};

// ! for canceling order
const cancelOrder = async (id: string) => {
  const orderData = await orderModel.findById(id);

  if (!orderData) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid order data !! ");
  }

  console.log(orderData?.status);

  console.log(orderData?.orderItems);

  const session = await startSession();
  try {
    session.startTransaction();

    const modifiedData = await orderModel.findByIdAndUpdate(
      id,
      { status: orderStatus.canceled },
      { new: true, runValidators: true, session }
    );

    for (const orderItem of orderData?.orderItems || []) {
      await productModel.findByIdAndUpdate(
        orderItem?.product,
        {
          $inc: { stockQuantity: orderItem?.quantity },
        },
        { new: true, session }
      );
    }

    await session.commitTransaction();
    await session.endSession();

    return modifiedData;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
  }

  //
};

// ! for getting all order data
const getAllOrder = async () => {
  const result = await orderModel.find().populate("address").populate({
    path: "user",
    select: " -userRole -status -createdAt -updatedAt -password -isDeleted ",
  });

  return result;
};

// ! for getting single order
const getSingleOrder = async (id: string) => {
  const orderData = await orderModel.findById(id).populate("address user");

  if (!orderData) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid order id !!!");
  }

  return orderData;
};

//
export const orderServices = {
  directOrderItem,
  orderFromCart,
  approveOrder,
  getAllOrder,
  cancelOrder,
  getSingleOrder,
};
