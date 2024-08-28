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
    )

    return router;
}
