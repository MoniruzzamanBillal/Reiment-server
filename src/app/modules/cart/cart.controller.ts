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

// ! for adding item in cart
const addCartItem = catchAsync(async (req, res) => {
  const { userId } = req.user;

  const result = await cartServices.addingCartItem(req.body, userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Item added to cart successfully !!!",
    data: result,
  });
});

// ! for removing item in cart
const removeCartItem = catchAsync(async (req, res) => {
  const { userId } = req.user;

  const result = await cartServices.removeCartItem(req.body?.productId, userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Item removed from cart successfully !!!",
    data: result,
  });
});

// ! for adding cart item quantity
const addCartItemQuantity = catchAsync(async (req, res) => {
  const { userId } = req.user;

  const result = await cartServices.addCartItemQuantity(req.body, userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " Item quantity increased successfully !!!",
    data: result,
  });
});

// ! for adding cart item quantity
const decreaseCartItemQuantity = catchAsync(async (req, res) => {
  const { userId } = req.user;

  const result = await cartServices.decreaseCartItemQuantity(req.body, userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " Item quantity decreased successfully !!!",
    data: result,
  });
});

//
export const cartController = {
  addToCart,
  getUserCart,
  addCartItem,
  removeCartItem,
  addCartItemQuantity,
  decreaseCartItemQuantity,
};
