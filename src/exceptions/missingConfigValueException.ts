export class MissingConfigValueException extends Error {
    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, MissingConfigValueException.prototype);
    }
}
