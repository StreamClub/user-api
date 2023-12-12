import { Express } from "express";
import { AuthRouter } from "./authRouter";
import AppDependencies from "appDependencies";

export function registerRouters(app: Express, dependencies: AppDependencies) {
    app.get("/health", (_, res) => res.status(200).send());
    app.use("/auth", AuthRouter(dependencies));
}
