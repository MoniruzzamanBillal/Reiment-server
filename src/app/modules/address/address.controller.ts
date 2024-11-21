import { TAddress } from "./address.interface";
import { addressModel } from "./address.model";

// ! for creating address
const addAddress = async (payload: TAddress) => {
  const result = await addressModel.create(payload);

  return result;
};

// ! for getting user address
const getUserAddress = async (userId: string) => {
  const result = await addressModel.find({ user: userId });
  return result;
};

// ! for updating address
const updateUserAddress = async (
  payload: Partial<TAddress>,
  userId: string
) => {
  const result = await addressModel.findByIdAndUpdate(
    { user: userId },
    payload,
    { new: true, upsert: true }
  );
  return result;
};

//
export const addressController = {
  addAddress,
  getUserAddress,
  updateUserAddress,
};
