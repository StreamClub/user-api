import { Express } from "express";
import { UserRouter } from "./userRouter";
import AppDependencies from "appDependencies";

export function registerRouters(app: Express, dependencies: AppDependencies) {
    app.get("/health", (_, res) => res.status(200).send());
    app.use("/users", UserRouter(dependencies));
}
