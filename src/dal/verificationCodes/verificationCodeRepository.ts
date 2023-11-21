import { Moment } from 'moment';
import { VerificationCodeModel } from './verificationCodeModel';
import { VerificationCode } from 'entities';
import { Op } from 'sequelize';


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

    public async deleteExpiredVerificationCodes(expiration: Moment): Promise<void> {
        await VerificationCodeModel.destroy({ where: { updatedAt: { [Op.lte]: expiration } } });
    }
}

export const verificationCodeRepository = new VerificationCodeRepository();
