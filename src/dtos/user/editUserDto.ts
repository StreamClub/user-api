import Joi from "joi";

export class EditUserDto {
    displayName: string;
}

export const EditUserSchema = Joi.object({
    displayName: Joi.string().required().max(255),
});
