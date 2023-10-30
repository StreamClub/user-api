import Joi from "joi";

export class RegisterUserDto {
    email: string;
    password: string;
    validationCode: string;
}

export const RegisterUserSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    validationCode: Joi.string().required(),
});
