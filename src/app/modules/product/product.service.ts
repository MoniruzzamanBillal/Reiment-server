import httpStatus from "http-status";
import AppError from "../../Error/AppError";
import { SendImageCloudinary } from "../../util/SendImageCloudinary";
import { TProduct } from "./product.interface";
import { productModel } from "./product.model";

// ! for creating a product
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createProduct = async (payload: TProduct, file: any) => {
  const name = file?.originalname?.trim();
  const path = file?.path;

  const imgUrlResult = await SendImageCloudinary(path, name as string);

  const imgUrl = imgUrlResult?.secure_url;

  const result = await productModel.create({
    ...payload,
    productImage: imgUrl,
  });

  return result;
};

// ! for updating a product
const updateProduct = async (
  payload: Partial<TProduct>,
  file: any,
  id: string
) => {
  const productData = await productModel.findById(id);

  if (!productData) {
    throw new AppError(httpStatus.BAD_REQUEST, "Product not found !!!");
  }

  if (file) {
    const name = file?.originalname?.trim();
    const path = file?.path;
    const imgUrlResult = await SendImageCloudinary(path, name as string);

    const imgUrl = imgUrlResult?.secure_url;

    payload.productImage = imgUrl;
  }

  const result = await productModel.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

// ! for getting all products
const getAllProducts = async () => {
  const result = await productModel.find();

  return result;
};

// ! for getting specific product
const getSingleProduct = async (id: string) => {
  const result = await productModel.findById(id);
  return result;
};

// ! for deleting a product
const deleteProduct = async (id: string) => {
  const result = await productModel.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
    }
  );

  return result;
};

//
export const productServices = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
