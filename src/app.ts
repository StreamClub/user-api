import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { pinoHttp } from 'pino-http';
import pinoLogger from "pino";
import { config } from "@config";
import { exceptionToHttpError } from '@middlewares';
import { registerRouters } from "@routes";
import { Db } from "@dal";
import { cronjobService } from "@services";

dotenv.config();

async function main() {

    const app = express();

    app.use(pinoHttp());
    app.use(cors());
    app.use(express.json());
    registerRouters(app);
    app.use(exceptionToHttpError);
    const db = new Db();
    db.init();
    cronjobService.start();

    app.listen(config.port, () => {
        const logger = pinoLogger();
        logger.info(`Process API listening on port ${config.port}`);
    });
}

main();
