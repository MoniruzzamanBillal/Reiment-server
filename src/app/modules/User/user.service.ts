import httpStatus from "http-status";
import AppError from "../../Error/AppError";
import { SendImageCloudinary } from "../../util/SendImageCloudinary";
import { UserRole } from "./user.constants";
import { TUser } from "./user.interface";
import { userModel } from "./user.model";

// ! for getting all user
const getUsersFromDb = async () => {
  const result = await userModel.find({ userRole: { $ne: UserRole.admin } });
  return result;
};

// ! for getting logged in user
const getLoggedInUser = async (userId: string) => {
  const result = await userModel.findById(userId);

  return result;
};

// ! for updating a user
const updateUser = async (
  payload: Partial<TUser>,
  file: any,
  userId: string
) => {
  const userData = await userModel.findById(userId);

  if (!userData) {
    throw new AppError(httpStatus.BAD_REQUEST, "User dont exist !!");
  }

  if (file) {
    const name = userData?.name.trim();
    const path = (file?.path as string).trim();

    const cloudinaryResponse = await SendImageCloudinary(
      path as string,
      name as string
    );
    const profileImg = cloudinaryResponse?.secure_url;
    payload.profilePicture = profileImg;
  }

  const result = await userModel.findByIdAndUpdate(userId, payload, {
    new: true,
  });

  return result;
};

//

export const userServices = {
  getUsersFromDb,
  getLoggedInUser,
  updateUser,
};
