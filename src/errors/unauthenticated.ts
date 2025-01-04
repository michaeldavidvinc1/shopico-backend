import { StatusCodes } from "http-status-codes";
// import custom-api
import CustomAPIError from "./custom-api-error";

class UnauthenticatedError extends CustomAPIError {
  statusCode: number;
  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

export default UnauthenticatedError
