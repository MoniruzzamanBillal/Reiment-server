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

//
export const cartController = {
  addToCart,
};
