import { SendImageCloudinary } from "../../util/SendImageCloudinary";
import { TProduct } from "./product.interface";
import { productModel } from "./product.model";

// ! for creating a product
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createProduct = async (payload: TProduct, files: any) => {
  // console.log(payload);
  // console.log(files);

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

  // console.log(imageUrls);

  const result = await productModel.create({
    ...payload,
    productImages: imageUrls,
  });

  return result;
};

//
export const productServices = {
  createProduct,
};
