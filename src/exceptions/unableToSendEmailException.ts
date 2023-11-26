export class UnableToSendEmailException extends Error {
    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, UnableToSendEmailException.prototype);
    }
}
