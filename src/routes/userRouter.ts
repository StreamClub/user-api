import {
    FieldOptions,
    handleRequest,
    loadUserContext,
    validateSchema,
} from "@middlewares";
import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import { UserController } from "@controllers";
import AppDependencies from "appDependencies";
import {
    EditUserSchema, GetFriendRequestSchema, GetProfileSchema,
    GetUserNamesSchema, SearchUserSchema
} from "@dtos";

export function UserRouter(dependencies: AppDependencies) {
    const router = Router();
    const userController = new UserController(dependencies);

    router.get("/",
        loadUserContext,
        validateSchema(SearchUserSchema, [FieldOptions.query]),
        handleRequest(
            (req) => userController.searchUser(req),
            StatusCodes.OK
        )
    )

    router.get(
        "/userNames",
        validateSchema(GetUserNamesSchema, [FieldOptions.query]),
        handleRequest(
            (req) => userController.getUserNames(req),
            StatusCodes.OK
        )
    )

    router.get(
        "/friendRequest",
        loadUserContext,
        handleRequest(
            (req, res) => userController.getFriendRequest(req, res),
            StatusCodes.OK
        )
    )

    router.delete(
        "/friendRequest/:friendRequestId",
        loadUserContext,
        handleRequest(
            (req, res) => userController.deleteFriendRequest(req, res),
            StatusCodes.OK
        )
    )

    router.get(
        "/:userId",
        loadUserContext,
        validateSchema(GetProfileSchema, [FieldOptions.params]),
        handleRequest(
            (req) => userController.get(req),
            StatusCodes.OK
        )
    );

    router.post(
        "/:userId/friendRequest",
        loadUserContext,
        validateSchema(GetFriendRequestSchema, [FieldOptions.params, FieldOptions.query]),
        handleRequest(
            (req, res) => userController.sendFriendRequest(req, res),
            StatusCodes.OK
        )
    )

    router.patch(
        "/",
        loadUserContext,
        validateSchema(EditUserSchema, [FieldOptions.body]),
        handleRequest(
            (req, res) => userController.update(req, res),
            StatusCodes.OK
        )
    );

    return router;
}
