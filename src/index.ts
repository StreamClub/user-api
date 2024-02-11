require('module-alias/register')
import * as dotenv from "dotenv";
import { App } from "./app";
import AppDependencies from "./appDependencies";
import { Db } from "@dal";
import { MailHandler } from "@handlers";
import { config } from "@config";
import http from "http";
import { logger } from "@utils";

const startServerDependencies = (): AppDependencies => {
    const db = new Db(config.dbUrl, false);
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
        logger.info(`User Api Listening on Port: ${process.env.EXTERNAL_PORT}`)
    });
});
