import { MAX_VALIDATION_CODE, MIN_VALIDATION_CODE } from "@config";
import Joi from "joi";

export class RegisterUserDto {
    email: string;
    password: string;
    verificationCode: number;
}

export const RegisterUserSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    verificationCode: Joi.number().required().min(MIN_VALIDATION_CODE).max(MAX_VALIDATION_CODE),
});
