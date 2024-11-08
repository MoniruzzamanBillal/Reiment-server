import httpStatus from "http-status";
import catchAsync from "../../util/catchAsync";
import sendResponse from "../../util/sendResponse";
import { productServices } from "./product.service";

// ! for creating product
const createProduct = catchAsync(async (req, res) => {
  const result = await productServices.createProduct(req.body, req.files);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product created successfully !!!",
    data: result,
  });
});

//
export const productController = {
  createProduct,
};
