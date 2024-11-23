import httpStatus from "http-status";
import { Types } from "mongoose";
import AppError from "../Error/AppError";

export const checkDataExist = async (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  model: any,
  id: string | Types.ObjectId,
  errorMessage: string
) => {
  const data = await model.findById(id);

  if (!data) {
    throw new AppError(httpStatus.BAD_REQUEST, errorMessage);
  }

  return data;
};
