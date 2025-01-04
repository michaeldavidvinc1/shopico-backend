// import http-status-codes
import { StatusCodes } from "http-status-codes";
import CustomAPIError from "./custom-api-error";
// import custom-api

class BadRequest extends CustomAPIError {
  statusCode: number;
  constructor(message: string) {
    super(message);
    // memberikan statusCode bad request
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}
export default BadRequest