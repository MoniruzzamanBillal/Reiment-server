// ! create user in database

import bcrypt from "bcrypt";
import httpStatus from "http-status";
import config from "../../config";
import AppError from "../../Error/AppError";
import { SendImageCloudinary } from "../../util/SendImageCloudinary";
import { Tlogin, TUser } from "../User/user.interface";
import { userModel } from "../User/user.model";
import { createToken } from "./auth.util";

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

// ! sign in
const signInFromDb = async (payload: Tlogin) => {
  const user = await userModel.findOne({ email: payload?.email });

  if (!user) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "User dont exist with this email !!!"
    );
  }

  const isPasswordMatch = await bcrypt.compare(
    payload?.password,
    user?.password
  );

  if (!isPasswordMatch) {
    throw new AppError(httpStatus.FORBIDDEN, "Password don't match !!");
  }

  const userId = user?._id.toHexString();
  const userRole = user?.userRole;

  const jwtPayload = {
    userId,
    userRole,
  };

  const token = createToken(jwtPayload, config.jwt_secret as string, "20d");

  return {
    user,
    token,
  };

  //
};

//
export const authServices = {
  createUserIntoDB,
  signInFromDb,
};
