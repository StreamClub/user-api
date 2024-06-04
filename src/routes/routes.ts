import { Express } from "express";
import AppDependencies from "appDependencies";
import { UserRouter, AuthRouter, FriendRouter, PointRouter } from "@routes";

export function registerRouters(app: Express, dependencies: AppDependencies) {
    app.get("/health", (_, res) => res.status(200).send());
    app.use("/auth", AuthRouter(dependencies));
    app.use("/users", UserRouter(dependencies));
    app.use("/friends", FriendRouter(dependencies));
    app.use("/points", PointRouter(dependencies));
}
