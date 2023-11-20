export class VerificationCode {
    public email!: string;
    public verificationCode!: number;

    constructor(data: Partial<VerificationCode>) {
        Object.assign(this, data);
    }
}
