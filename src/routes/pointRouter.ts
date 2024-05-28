import {
    FieldOptions,
    handleRequest,
    loadUserContext,
    validateSchema,
} from "@middlewares";
import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import AppDependencies from "appDependencies";
import { PointController } from "@controllers";
import { AddPointsSchema } from "@dtos";


export function PointRouter(dependencies: AppDependencies) {
    const router = Router();
    const pointController = new PointController(dependencies);

    router.patch(
        "/",
        loadUserContext,
        validateSchema(AddPointsSchema, [FieldOptions.body]),
        handleRequest(
            (req, res) => pointController.addPoints(req, res),
            StatusCodes.OK
        )
    )

    return router;
}
