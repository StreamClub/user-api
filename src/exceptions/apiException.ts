export abstract class ApiException extends Error {
    public code: number;
    public description: string;

    constructor(message: string) {
        super(message);
    }
}
