import Joi from "joi";

export class CreateGroupDto {
    name: string;
    members: number[];
}

export const CreateGroupSchema = Joi.object({
    name: Joi.string().required().min(1).max(255),
    members: Joi.array().items(Joi.number()).required().empty(Joi.array().length(0)),
});
