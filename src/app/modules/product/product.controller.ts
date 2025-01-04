import httpStatus from "http-status";
import catchAsync from "../../util/catchAsync";
import sendResponse from "../../util/sendResponse";
import { productServices } from "./product.service";

// ! for creating product
const createProduct = catchAsync(async (req, res) => {
  const result = await productServices.createProduct(req.body, req.file);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product created successfully !!!",
    data: result,
  });
});

// ! for updating a product
const updateProduct = catchAsync(async (req, res) => {
  const result = await productServices.updateProduct(
    req.body,
    req.file,
    req.params?.id
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product updated successfully !!!",
    data: result,
  });
});

// ! for getting all products
const getAllProducts = catchAsync(async (req, res) => {
  const result = await productServices.getAllProducts(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All Product retrived successfully !!!",
    data: result,
  });
});

// ! for getting single products
const getSingleProducts = catchAsync(async (req, res) => {
  const result = await productServices.getSingleProduct(req.params?.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product retrived successfully !!!",
    data: result,
  });
});

// ! for deleting products
const deleteSingleProduct = catchAsync(async (req, res) => {
  const result = await productServices.deleteProduct(req.params?.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product deleted successfully !!!",
    data: result,
  });
});

//
export const productController = {
  createProduct,
  getAllProducts,
  getSingleProducts,
  updateProduct,
  deleteSingleProduct,
};
