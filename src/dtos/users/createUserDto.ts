import Joi from "joi";

export class CreateUserDto {
    email: string;
    password: string;
    validationCode: string;
}

export const CreateUserSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    validationCode: Joi.string().required(),
});
