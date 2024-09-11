import Joi from "joi";

export class GetAllGroupsDto {
    pageNumber: number;
    pageSize: number;
}

export const GetAllGroupsSchema = Joi.object({
    pageNumber: Joi.number().integer().positive().optional(),
    pageSize: Joi.number().integer().positive().optional(),
});