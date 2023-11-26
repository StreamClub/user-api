import Joi from "joi";

export class RefreshCredentialsDto {
    refreshToken: string;
}

export const RefreshCredentialsSchema = Joi.object({
    refreshToken: Joi.string().required(),
});
