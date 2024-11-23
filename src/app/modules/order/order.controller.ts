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
    data: result,
  });
});

//
export const orderController = {
  createDirectOrderProduct,
};
