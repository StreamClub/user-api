import Joi from "joi";

export class GetUserNamesDto {
    userIds: number[];
}

export const GetUserNamesSchema = Joi.object({
    userIds: Joi.string().pattern(/^[0-9]+(,[0-9]+)*$/).required(),
});
