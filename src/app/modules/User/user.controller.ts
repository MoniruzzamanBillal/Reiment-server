import httpStatus from "http-status";
import catchAsync from "../../util/catchAsync";
import sendResponse from "../../util/sendResponse";
import { userServices } from "./user.service";

// ! for getting all users
const getUsers = catchAsync(async (req, res) => {
  const result = await userServices.getUsersFromDb();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users retrived successfully !!!",
    data: result,
  });
});

//
export const userController = {
  getUsers,
};
