import { MAX_STRING_LENGTH } from "@config";
import Joi from "joi";

export class SearchUserDto {
    query: string;
}

export const SearchUserSchema = Joi.object({
    query: Joi.string().max(MAX_STRING_LENGTH).required(),
});
