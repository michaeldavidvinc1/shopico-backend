import { StatusCodes } from "http-status-codes";
// import custom-api
import CustomAPIError from "./custom-api-error";

class NotFound extends CustomAPIError {
  statusCode: number;
  constructor(message: string) {
    super(message);
    // memberikan statusCode not found
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}
export default NotFound
