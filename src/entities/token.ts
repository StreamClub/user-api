export class Token {
    public email!: string;
    public refreshToken!: string;

    constructor(data: Partial<Token>) {
        Object.assign(this, data);
    }
}

export class DecodedRefreshToken {
    public userId!: string;
    public uuid!: string;

    constructor(data: Partial<DecodedRefreshToken>) {
        Object.assign(this, data);
    }
}
