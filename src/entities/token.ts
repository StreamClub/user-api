export class Token {
    public email!: string;
    public refreshToken!: string;

    constructor(data: Partial<Token>) {
        Object.assign(this, data);
    }
}

export class DecodedToken {
    public email!: string;
    public userId!: string;
    public uuid!: string;

    constructor(data: Partial<DecodedToken>) {
        Object.assign(this, data);
    }
}
