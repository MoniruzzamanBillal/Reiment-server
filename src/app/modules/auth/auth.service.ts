// ! create user in database

import { SendImageCloudinary } from "../../util/SendImageCloudinary";
import { TUser } from "../User/user.interface";
import { userModel } from "../User/user.model";

// ! create user in database
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createUserIntoDB = async (payload: Partial<TUser>, file: any) => {
  const name = payload?.name;
  const path = file?.path;

  const userImgresult = await SendImageCloudinary(path, name as string);

  const userImg = userImgresult?.secure_url;

  const result = await userModel.create({
    ...payload,
    profilePicture: userImg,
  });

  return result;
};

//
export const authServices = {
  createUserIntoDB,
};
