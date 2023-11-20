export class InvalidCodeException extends Error {
    constructor() {
        super("El código ingresado es inválido. Por favor, intente nuevamente.");
        Object.setPrototypeOf(this, InvalidCodeException.prototype);
    }
}
