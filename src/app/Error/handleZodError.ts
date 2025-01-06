import httpStatus from "http-status";
import { ZodError } from "zod";
import { TerrorMessages, TgenericResponse } from "../interface/error";

export const handleZodError = (error: ZodError): TgenericResponse => {
  const errorSources: TerrorMessages = error?.issues?.map((issue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue?.message,
    };
  });

  const statusCode = httpStatus.BAD_REQUEST;

  return {
    statusCode,
    message: error?.message,
    errorSources,
  };
};
