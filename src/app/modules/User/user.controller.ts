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

// ! get logged in user
const getLoggedInUser = catchAsync(async (req, res) => {
  const result = await userServices.getLoggedInUser(req.user?.userId);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "User Retrived successfully!!!",
    data: result,
  });
});

// ! for updating a user
const updateUser = catchAsync(async (req, res) => {
  const result = await userServices.updateUser(
    req.body,
    req.file,
    req.user?.userId
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User updated successfully!!!",
    data: result,
  });
});

//
export const userController = {
  getUsers,
  getLoggedInUser,
  updateUser,
};
