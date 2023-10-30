import { Express } from "express";
import { UserRouter } from "./userRouter";

export function registerRouters(app: Express) {
    app.get("/health", (_, res) => res.status(200).send());
    app.use("/users", UserRouter());
}
