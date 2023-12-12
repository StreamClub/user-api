import { StatusCodes } from "http-status-codes";
import { ApiException } from "./apiException";

export class UnableToSendEmailException extends ApiException {
    constructor(message: string) {
        super(message);
        this.code = StatusCodes.INTERNAL_SERVER_ERROR;
        this.description = "Unable To Send Email";
    }
}
