import Joi from "joi";
import { FriendRequestActions } from "@config";

export class DeleteFriendRequestDto {
    requestId: number;
    action: string;
}

export const DeleteFriendRequestSchema = Joi.object({
    requestId: Joi.number().integer().positive().required(),
    action: Joi.string().valid(FriendRequestActions.REMOVE, FriendRequestActions.ACCEPT).required(),
});
