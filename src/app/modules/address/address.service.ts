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
const updateUserAddress = async (payload: Partial<TAddress>, id: string) => {
  const result = await addressModel.findByIdAndUpdate(id, payload, {
    new: true,
    upsert: true,
  });
  return result;
};

// ! for deleting user address
const deleteUserAddress = async (id: string) => {
  const result = await addressModel.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );
  return result;
};

//
export const addressServices = {
  addAddress,
  getUserAddress,
  updateUserAddress,
  deleteUserAddress,
};
