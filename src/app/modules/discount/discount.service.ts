import { TDiscount } from "./discount.interface";
import { discountModel } from "./discount.model";

// ! for adding discount cupon
const addDiscountCupon = async (payload: TDiscount) => {
  const { code, percentage, cuponExpireDay } = payload;
  const today = new Date();

  today.setDate(today.getDate() + cuponExpireDay!);
  const expiryDate = today.toISOString();

  const result = await discountModel.create({ code, percentage, expiryDate });
  return result;
};

// ! for getting all cupon data
const getAllCuponData = async () => {
  const result = await discountModel.find();
  return result;
};

// ! for getting single cupon data
const getSingleCupon = async (cuponId: string) => {
  const result = await discountModel.findById(cuponId);

  return result;
};

// ! for updating cupon data
const updateCuponData = async (
  payload: Partial<TDiscount>,
  cuponId: string
) => {
  const result = await discountModel.findByIdAndUpdate(cuponId, payload, {
    new: true,
    upsert: true,
  });

  return result;
};

// ! for deleting cupon data
const deleteCupon = async (cuponId: string) => {
  const result = await discountModel.findByIdAndUpdate(
    cuponId,
    { isDeleted: true },
    { new: true, upsert: true }
  );
  return result;
};

//
export const discountServices = {
  addDiscountCupon,
  getAllCuponData,
  getSingleCupon,
  updateCuponData,
  deleteCupon,
};
