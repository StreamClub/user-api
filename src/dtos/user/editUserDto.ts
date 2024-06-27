import { PHOTOS_IDS } from "@config";
import Joi from "joi";

export class EditUserDto {
    displayName: string;
    photoId: number;
}

export const EditUserSchema = Joi.object({
    displayName: Joi.string().optional().max(255),
    photoId: Joi.number().optional().valid(...PHOTOS_IDS)
});
