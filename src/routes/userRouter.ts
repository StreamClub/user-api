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
import { GetProfileSchema } from "@dtos";

export function UserRouter(dependencies: AppDependencies) {
    const router = Router();
    const userController = new UserController(dependencies);

    router.get(
        "/:userId",
        loadUserContext,
        validateSchema(GetProfileSchema, [FieldOptions.params]),
        handleRequest(
            (req) => userController.get(req),
            StatusCodes.OK
        )
    );

    return router;
}
