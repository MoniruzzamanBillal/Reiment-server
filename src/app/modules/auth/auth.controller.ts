import httpStatus from "http-status";
import catchAsync from "../../util/catchAsync";
import sendResponse from "../../util/sendResponse";
import { authServices } from "./auth.service";

// ! for crating a user
const createUser = catchAsync(async (req, res) => {
  const result = await authServices.createUserIntoDB(req.body, req.file);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User registered successfully ",
    data: result,
  });
});

// ! signin
const signIn = catchAsync(async (req, res) => {
  const result = await authServices.signInFromDb(req.body);

  const { token, user } = result;

  const modifiedToken = `Bearer ${token}`;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const modifiedUser = user.toObject() as any;
  delete modifiedUser.password;

  res.cookie("token", modifiedToken, {
    secure: false,
    httpOnly: true,
    sameSite: "none",
    maxAge: 1000 * 60 * 60 * 24 * 365,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User logged in successfully ",
    data: modifiedUser,
    token: token,
  });
});

//
export const authController = {
  createUser,
  signIn,
};
