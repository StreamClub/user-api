import { MAX_POINTS } from "@config";
import Joi from "joi";

export class AddPointsDto {
    amount: number;
}

export const AddPointsSchema = Joi.object({
    amount: Joi.number().integer().positive().max(MAX_POINTS).required(),
});
