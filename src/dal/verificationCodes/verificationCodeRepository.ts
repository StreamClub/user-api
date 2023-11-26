import { VerificationCodeModel } from './verificationCodeModel';
import { VerificationCode } from 'entities';
import { Op } from 'sequelize';
import moment from 'moment';
import { VALIDATION_CODE_LIFE_UNIT, config } from '@config';


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

    public async deleteExpiredVerificationCodes(): Promise<void> {
        await VerificationCodeModel.destroy({
            where: {
                updatedAt: {
                    [Op.lte]:
                        moment().add(config.verificationCodeLifeMinutes, VALIDATION_CODE_LIFE_UNIT)
                }
            }
        });
    }
}

export const verificationCodeRepository = new VerificationCodeRepository();
