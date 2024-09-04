import {
    FieldOptions,
    handleRequest,
    loadUserContext,
    validateSchema,
} from "@middlewares";
import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import AppDependencies from "appDependencies";
import { GroupController } from "@controllers";
import { CreateGroupSchema, GetAllGroupsSchema } from "@dtos";

export function GroupRouter(dependencies: AppDependencies) {
    const router = Router();
    const groupController = new GroupController(dependencies);

    router.get(
        "/",
        loadUserContext,
        handleRequest(
            (req, res) => groupController.getUserGroups(req, res),
            StatusCodes.OK
        )
    );

    router.post(
        "/",
        loadUserContext,
        validateSchema(CreateGroupSchema, [FieldOptions.body]),
        handleRequest(
            (req, res) => groupController.createGroup(req, res),
            StatusCodes.CREATED
        )
    );

    router.get(
        "/all",
        validateSchema(GetAllGroupsSchema, [FieldOptions.query]),
        handleRequest(
            (req, res) => groupController.getAllGroups(req, res),
            StatusCodes.OK
        )
    )

    router.get(
        "/:id",
        loadUserContext,
        handleRequest(
            (req, res) => groupController.getGroup(req, res),
            StatusCodes.OK
        )
    );

    router.delete(
        "/:id",
        loadUserContext,
        handleRequest(
            (req, res) => groupController.deleteGroup(req, res),
            StatusCodes.OK
        )
    );

    return router;
}
