import httpStatus from "http-status";
import catchAsync from "../../util/catchAsync";
import sendResponse from "../../util/sendResponse";
import { addressServices } from "./address.service";

// ! for creating user address
const addAddress = catchAsync(async (req, res) => {
  const result = await addressServices.addAddress(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Address created successfully !!!",
    data: result,
  });
});

// ! for getting user address
const getUserAddress = catchAsync(async (req, res) => {
  const result = await addressServices.getUserAddress(req.user?.userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Address retrives successfully !!!",
    data: result,
  });
});

// ! for updating user address
const updateUserAddress = catchAsync(async (req, res) => {
  const result = await addressServices.updateUserAddress(
    req.body,
    req.params?.id
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Address updated successfully !!!",
    data: result,
  });
});

// ! for deleting user address
const deleteUserAddress = catchAsync(async (req, res) => {
  const result = await addressServices.deleteUserAddress(req.params?.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Address deleted successfully !!!",
    data: result,
  });
});

//
export const addressController = {
  addAddress,
  getUserAddress,
  updateUserAddress,
  deleteUserAddress,
};
