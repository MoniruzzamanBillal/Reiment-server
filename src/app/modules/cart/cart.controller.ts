import httpStatus from "http-status";
import catchAsync from "../../util/catchAsync";
import sendResponse from "../../util/sendResponse";
import { cartServices } from "./cart.service";

// ! for adding new cart , update item quantity
const addToCart = catchAsync(async (req, res) => {
  const result = await cartServices.addUpdateCart(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Item added to  successfully !!!",
    data: result,
  });
});

// ! for getting all user cart data
const getUserCart = catchAsync(async (req, res) => {
  const { userId } = req.user;

  const result = await cartServices.getUserCart(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User cart item retrived successfully !!!",
    data: result,
  });
});

//
export const cartController = {
  addToCart,
  getUserCart,
};
