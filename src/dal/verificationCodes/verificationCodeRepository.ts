import { VerificationCodeModel } from './verificationCodeModel';
import { VerificationCode } from 'entities';


class VerificationCodeRepository {
    public async save(verificationCode: VerificationCode) {
        await VerificationCodeModel.upsert(
            { ...verificationCode }
        );
    }

    public async findOneByEmail(email: string): Promise<VerificationCode | null> {
        const verificationCode = await VerificationCodeModel.findOne({ where: { email } });
        if (!verificationCode) return null;
        return new VerificationCode({
            ...verificationCode.toJSON(),
        });
    }
}

export const verificationCodeRepository = new VerificationCodeRepository();
