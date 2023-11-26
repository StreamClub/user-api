import Joi from "joi";

export class sendVerificationCodeDto {
    email: string;
}

export const sendVerificationCodeSchema = Joi.object({
    email: Joi.string().email().required(),
});
