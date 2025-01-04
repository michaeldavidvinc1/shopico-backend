import { StatusCodes } from "http-status-codes";
// import custom-api
import CustomAPIError from "./custom-api-error";

class Unauthorized extends CustomAPIError {
    statusCode: number;
    constructor(message: string) {
        super(message);
        this.statusCode = StatusCodes.FORBIDDEN;
    }
}

export default Unauthorized