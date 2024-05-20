import {
    FieldOptions,
    handleRequest,
    loadUserContext,
    validateSchema,
} from "@middlewares";
import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import { FriendController } from "@controllers";
import AppDependencies from "appDependencies";
import {
    DeleteFriendRequestSchema,
    GetFriendRequestSchema,
} from "@dtos";

export function FriendRouter(dependencies: AppDependencies) {
    const router = Router();
    const friendController = new FriendController(dependencies);

    router.get(
        "/request",
        loadUserContext,
        handleRequest(
            (req, res) => friendController.getFriendRequest(req, res),
            StatusCodes.OK
        )
    )

    router.delete(
        "/request/:friendRequestId",
        loadUserContext,
        validateSchema(DeleteFriendRequestSchema, [FieldOptions.params, FieldOptions.body]),
        handleRequest(
            (req, res) => friendController.deleteFriendRequest(req, res),
            StatusCodes.OK
        )
    )

    router.post(
        "request/:userId",
        loadUserContext,
        validateSchema(GetFriendRequestSchema, [FieldOptions.params, FieldOptions.query]),
        handleRequest(
            (req, res) => friendController.sendFriendRequest(req, res),
            StatusCodes.OK
        )
    )

    return router;
}
