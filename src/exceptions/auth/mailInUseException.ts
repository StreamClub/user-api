import { StatusCodes } from "http-status-codes";
import { ApiException } from "../apiException";

export class MailInUseException extends ApiException {
    constructor() {
        super('El correo ingresado ya se encuentra registrado.');
        this.code = StatusCodes.CONFLICT;
        this.description = "Email Already In Use Exception";
    }
}
