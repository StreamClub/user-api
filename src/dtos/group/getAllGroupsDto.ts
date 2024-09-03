import Joi from "joi";

export class GetAllGroupsDto {
    page: number;
    pageSize: number;
}

export const GetAllGroupsSchema = Joi.object({
    page: Joi.number().integer().positive().optional(),
    pageSize: Joi.number().integer().positive().optional(),
});