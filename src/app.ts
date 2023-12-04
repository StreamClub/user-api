import express from "express";
import cors from "cors";
import { pinoHttp } from 'pino-http';
import { exceptionToHttpError } from '@middlewares';
import { registerRouters } from "@routes";
import { cronjobService } from "@services";
import AppDependencies from "./appDependencies";

export class App {
    private dependencies: AppDependencies;
    public constructor(dependencies: AppDependencies) {
        this.dependencies = dependencies;
    }

    public async start() {
        const app = express();

        app.use(pinoHttp());
        app.use(cors());
        app.use(express.json());
        registerRouters(app, this.dependencies);
        app.use(exceptionToHttpError);
        // cronjobService.start();
        return app;
    }
}
