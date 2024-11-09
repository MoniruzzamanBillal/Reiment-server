import { SendImageCloudinary } from "../../util/SendImageCloudinary";
import { TProduct } from "./product.interface";
import { productModel } from "./product.model";

// ! for creating a product
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createProduct = async (payload: TProduct, files: any) => {
  const imageUrls = await Promise.all(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    files?.map(async (file: any) => {
      const name = file?.originalname;
      const path = file?.path;

      const imgUrlResult = await SendImageCloudinary(path, name as string);

      const imgUrl = imgUrlResult?.secure_url;

      return imgUrl;
    })
  );

  const result = await productModel.create({
    ...payload,
    productImages: imageUrls,
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

// ! for updating a product
const updateProduct = async (payload: Partial<TProduct>, id: string) => {
  const result = await productModel.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

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
