import httpStatus from "http-status";
import catchAsync from "../../util/catchAsync";
import sendResponse from "../../util/sendResponse";
import { orderServices } from "./order.service";

// ! for direct order
const createDirectOrderProduct = catchAsync(async (req, res) => {
  const { userId } = req.user;

  const result = await orderServices.directOrderItem(req.body, userId);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Order placed successfully !!!",
    data: result?.payment_url,
  });
});

// ! for ordering from cart
const orderFromCartProduct = catchAsync(async (req, res) => {
  const { userId } = req.user;

  const result = await orderServices.orderFromCart(req.body, userId);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Order placed successfully !!!",
    data: result?.payment_url,
  });
});

// ! for getting all order data
const getAllOrder = catchAsync(async (req, res) => {
  const result = await orderServices.getAllOrder();

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Order data retrived  successfully !!!",
    data: result,
  });
});

// ! for approving order data
const approveOrder = catchAsync(async (req, res) => {
  const result = await orderServices.approveOrder(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Order  Approved successfully ",
    data: result,
  });
});

//  ! for canceling order
const cancelOrder = catchAsync(async (req, res) => {
  const result = await orderServices.cancelOrder(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Order Canceled successfully ",
    data: result,
  });
});

//
export const orderController = {
  createDirectOrderProduct,
  orderFromCartProduct,
  getAllOrder,
  approveOrder,
  cancelOrder,
};
