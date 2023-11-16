import {
    FieldOptions,
    handleRequest,
    validateSchema,
} from "@middlewares";
import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import { LoginSchema, RefreshCredentialsSchema, RegisterUserSchema } from "@dtos";
import { userController } from "@controllers";

export function UserRouter() {
    const router = Router();

    router.post(
        "/register",
        validateSchema(RegisterUserSchema, [FieldOptions.body]),
        handleRequest(
            (req) => userController.register(req),
            StatusCodes.CREATED
        )
    );

    router.post(
        "/login",
        validateSchema(LoginSchema, [FieldOptions.body]),
        handleRequest(
            (req) => userController.login(req),
            StatusCodes.OK
        )
    );

    router.post(
        "/refreshCredentials",
        validateSchema(RefreshCredentialsSchema, [FieldOptions.body]),
        handleRequest(
            (req) => userController.refreshCredentials(req),
            StatusCodes.OK
        )
    );

    return router;
}
