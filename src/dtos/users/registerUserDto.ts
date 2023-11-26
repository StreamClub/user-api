import Joi from "joi";

export class RegisterUserDto {
    email: string;
    password: string;
    verificationCode: number;
}

export const RegisterUserSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    verificationCode: Joi.number().required().min(100000).max(999999),
});
