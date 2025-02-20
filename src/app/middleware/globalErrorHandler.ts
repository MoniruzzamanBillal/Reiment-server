/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from "express";
import { handleCastError } from "../Error/handleCatError";
import config from "../config";
import { TerrorSource } from "../interface/error";

const globalErrorHandler: ErrorRequestHandler = async (
  error,
  req,
  res,
  next
) => {
  let status = error.status || 500;
  let message = error.message || "Something went wrong!!";

  let errorSources: TerrorSource = [
    {
      path: "",
      message: "",
    },
  ];

  // ! cast error
  if (error?.name === "CastError") {
    const simplifiedError = handleCastError(error);
    status = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  }

  return res.status(status).json({
    success: false,
    message,
    errorSources,
    stack: config.node_env === "development" ? error?.stack : null,
  });
};

export default globalErrorHandler;
