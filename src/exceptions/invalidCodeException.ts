export class InvalidCodeException extends Error {
    constructor() {
        super("The code you entered is invalid. Please try again.");
        Object.setPrototypeOf(this, InvalidCodeException.prototype);
    }
}
