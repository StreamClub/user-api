import {
    FieldOptions,
    handleRequest,
    validateSchema,
} from "@middlewares";
import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import {
    LoginSchema, RefreshCredentialsSchema, RegisterUserSchema,
    sendVerificationCodeSchema
} from "@dtos";
import { AuthController } from "@controllers";
import AppDependencies from "appDependencies";

export function AuthRouter(dependencies: AppDependencies) {
    const router = Router();
    const authController = new AuthController(dependencies);

    router.post(
        "/register",
        validateSchema(RegisterUserSchema, [FieldOptions.body]),
        handleRequest(
            (req) => authController.register(req),
            StatusCodes.CREATED
        )
    );

    router.post(
        "/login",
        validateSchema(LoginSchema, [FieldOptions.body]),
        handleRequest(
            (req) => authController.login(req),
            StatusCodes.OK
        )
    );

    router.post(
        "/refreshCredentials",
        validateSchema(RefreshCredentialsSchema, [FieldOptions.body]),
        handleRequest(
            (req) => authController.refreshCredentials(req),
            StatusCodes.CREATED
        )
    );

    router.post(
        "/sendVerificationCode",
        validateSchema(sendVerificationCodeSchema, [FieldOptions.body]),
        handleRequest(
            (req) => authController.sendVerificationCode(req),
            StatusCodes.CREATED
        )
    );

    return router;
}
