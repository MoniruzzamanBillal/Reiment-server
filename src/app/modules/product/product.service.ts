import { TProduct } from "./product.interface";

// ! for creating a product
const createProduct = async (payload: TProduct, files: any) => {
  console.log(payload);
  console.log(files);

  return null;
};

//
export const productServices = {
  createProduct,
};
