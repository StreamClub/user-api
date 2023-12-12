import { StatusCodes } from "http-status-codes";
import { ApiException } from "./apiException";

export class InvalidCodeException extends ApiException {
    constructor() {
        super("El código ingresado es inválido. Por favor, intente nuevamente.");
        this.code = StatusCodes.UNAUTHORIZED;
        this.description = "Invalid Code";
    }
}
