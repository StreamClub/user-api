import { StatusCodes } from "http-status-codes";
import { ApiException } from "./apiException";

export class UnauthorizedException extends ApiException {
  constructor(message: string) {
    super(message);
    this.code = StatusCodes.UNAUTHORIZED;
    this.description = "Unauthorized";
  }
}
