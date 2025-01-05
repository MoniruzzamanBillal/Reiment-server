// ! create user in database

import bcrypt from "bcrypt";
import httpStatus from "http-status";
import config from "../../config";
import AppError from "../../Error/AppError";
import { sendEmail } from "../../util/sendEmail";
import { Tlogin, TUser } from "../User/user.interface";
import { userModel } from "../User/user.model";
import { createToken } from "./auth.util";

// ! create user in database

const createUserIntoDB = async (payload: Partial<TUser>) => {
  const result = await userModel.create({
    ...payload,
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

// ! send mail for reseting password
const resetMailLink = async (email: string) => {
  const userData = await userModel.findOne({ email: email });

  if (!userData) {
    throw new AppError(httpStatus.BAD_REQUEST, "User don't exist !!");
  }

  if (userData?.isDeleted) {
    throw new AppError(httpStatus.BAD_REQUEST, "User is deleted !!");
  }

  const userId = userData?._id.toHexString();
  const userRole = userData?.userRole;

  const jwtPayload = {
    userId,
    userRole,
    name: userData?.email,
  };

  const token = createToken(jwtPayload, config.jwt_secret as string, "5m");

  const resetLink = `http://localhost:5173/reset-password/${token}`;

  const sendMailResponse = await sendEmail(resetLink, email);

  return sendMailResponse;
};

// ! for reseting password
const resetPasswordFromDb = async (payload: {
  userId: string;
  password: string;
}) => {
  const { userId, password } = payload;

  console.log(userId);
  console.log(password);
  console.log(payload);

  // ! check if  user exist
  const userData = await userModel.findById(userId);

  if (!userData) {
    throw new AppError(httpStatus.BAD_REQUEST, "User dont exist !!! ");
  }

  if (userData?.isDeleted) {
    throw new AppError(httpStatus.BAD_REQUEST, "User is deleted !!");
  }

  const hashedPassword = await bcrypt.hash(
    password,
    Number(config.bcrypt_salt_rounds)
  );

  await userModel.findByIdAndUpdate(
    userId,
    { password: hashedPassword },
    { new: true }
  );

  return null;
};

//
export const authServices = {
  createUserIntoDB,
  signInFromDb,
  resetMailLink,
  resetPasswordFromDb,
};
