import httpStatus from "http-status";
import catchAsync from "../../util/catchAsync";
import sendResponse from "../../util/sendResponse";
import { discountServices } from "./discount.service";

// ! for adding cupon
const addCupon = catchAsync(async (req, res) => {
  const result = await discountServices.addDiscountCupon(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Cupon created successfully !!!",
    data: result,
  });
});

// !  for getting all cupon data
const getAllCupon = catchAsync(async (req, res) => {
  const result = await discountServices.getAllCuponData();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Cupon data retrived successfully !!!",
    data: result,
  });
});

//  ! for getting single cupon data
const getSingleCupon = catchAsync(async (req, res) => {
  const result = await discountServices.getSingleCupon(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Cupon data retrived successfully !!!",
    data: result,
  });
});

// ! for updating cupon data
const updateCuponData = catchAsync(async (req, res) => {
  const result = await discountServices.updateCuponData(
    req.body,
    req.params.id
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Cupon data updated successfully !!!",
    data: result,
  });
});

//   ! for deleting cupon data
const deleteCupon = catchAsync(async (req, res) => {
  const result = await discountServices.deleteCupon(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Cupon data deleted successfully !!!",
    data: result,
  });
});

//
export const discountController = {
  addCupon,
  getAllCupon,
  getSingleCupon,
  updateCuponData,
  deleteCupon,
};
