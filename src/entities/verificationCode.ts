export class VerificationCode {
    public email!: string;
    public verificationCode!: number;
    public createdAt!: Date;
    public updatedAt!: Date;

    constructor(data: Partial<VerificationCode>) {
        Object.assign(this, data);
    }
}
