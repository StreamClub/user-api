import {
    FieldOptions,
    handleRequest,
    validateSchema,
} from "@middlewares";
import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import { LoginSchema, RefreshCredentialsSchema, RegisterUserSchema, sendVerificationCodeSchema } from "@dtos";
import { AuthController } from "@controllers";
import AppDependencies from "appDependencies";

export function AuthRouter(dependencies: AppDependencies) {
    const router = Router();
    const userController = new AuthController(dependencies);

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
            StatusCodes.CREATED
        )
    );

    router.post(
        "/sendVerificationCode",
        validateSchema(sendVerificationCodeSchema, [FieldOptions.body]),
        handleRequest(
            (req) => userController.sendVerificationCode(req),
            StatusCodes.CREATED
        )
    );

    return router;
}
