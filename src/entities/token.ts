export class Token {
    public email!: string;
    public refreshToken!: string;

    constructor(data: Partial<Token>) {
        Object.assign(this, data);
    }
}
