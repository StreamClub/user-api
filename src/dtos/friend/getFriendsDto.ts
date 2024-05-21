import Joi from "joi";

export class GetFriendsDto {
    page: number;
    pageSize: number;
}

export const GetFriendsSchema = Joi.object({
    page: Joi.number().integer().positive().optional(),
    pageSize: Joi.number().integer().positive().optional(),
});
