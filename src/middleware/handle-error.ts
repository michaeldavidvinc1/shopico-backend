import { StatusCodes } from "http-status-codes";
import { Response, Request, NextFunction } from "express";

interface CustomError extends Error {
  statusCode?: number;
  code?: number;
  keyValue?: Record<string, unknown>;
  errors?: Record<string, { message: string }>;
  value?: string;
}

const errorHandlerMiddleware = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error = err as CustomError; // Type assertion

  let customError: CustomError = {
    name: error.name || "Error", // Tambahkan 'name'
    statusCode: error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: error.message || "Something went wrong, try again later",
  };

  // Handle Mongoose validation error
  if (error.name === "ValidationError" && error.errors) {
    customError.message = Object.values(error.errors)
      .map((item) => item.message)
      .join(", ");
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  // Handle Mongoose duplicate key error
  if (error.code === 11000 && error.keyValue) {
    customError.message = `Duplicate value entered for ${Object.keys(
      error.keyValue
    )} field, please choose another value`;
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  // Handle invalid MongoDB ObjectId
  if (error.name === "CastError" && error.value) {
    customError.message = `No item found with id: ${error.value}`;
    customError.statusCode = StatusCodes.NOT_FOUND;
  }

  return res
    .status(customError.statusCode ?? StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ msg: customError.message });
};

export default errorHandlerMiddleware;
