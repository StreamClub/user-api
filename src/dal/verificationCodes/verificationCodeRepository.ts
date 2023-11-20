import { VerificationCodeModel } from './verificationCodeModel';
import { VerificationCode } from 'entities';


class VerificationCodeRepository {
    public async save(verificationCode: VerificationCode) {
        console.log('intentando guardar')
        console.log(verificationCode)
        await VerificationCodeModel.upsert(
            { ...verificationCode }
        );
        console.log('guardado')
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
