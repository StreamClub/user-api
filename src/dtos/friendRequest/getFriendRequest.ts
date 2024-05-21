import Joi from "joi";

export class GetFriendRequestDto {
    userId: number;
    page: number;
    pageSize: number;
}

export const GetFriendRequestSchema = Joi.object({
    userId: Joi.number().integer().positive().required(),
    page: Joi.number().integer().positive().optional(),
    pageSize: Joi.number().integer().positive().optional(),
});
