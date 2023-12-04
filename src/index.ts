require('module-alias/register')
import * as dotenv from "dotenv";
import { App } from "./app";
import AppDependencies from "./appDependencies";
import { Db } from "@dal";
import { MailHandler } from "@handlers";
import { config } from "@config";
import pinoLogger from "pino";
import http from "http";

const startServerDependencies = (): AppDependencies => {
    const db = new Db(config.dbUrl, true);
    const mailHandler = new MailHandler();
    return {
        db, mailHandler
    };
}

dotenv.config();
const dependencies = startServerDependencies();
new App(dependencies).start().then(app => {
    const server = http.createServer(app);
    server.listen(config.port, () => {
        const logger = pinoLogger();
        logger.info(`Users API listening on port ${config.port}`);
    });
});
