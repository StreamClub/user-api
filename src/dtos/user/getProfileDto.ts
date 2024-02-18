import Joi from "joi";

export class GetProfileDto {
    userId: number;
}

export const GetProfileSchema = Joi.object({
    userId: Joi.number().integer().positive().required(),
});
