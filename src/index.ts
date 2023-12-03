import * as dotenv from "dotenv";
import { App } from "app";
import AppDependencies from "appDependencies";
import { Db } from "@dal";
import { MailHandler } from "@handlers";

const startServerDependencies = (): AppDependencies => {
    const db = new Db();
    const mailHandler = new MailHandler();
    return {
        db, mailHandler
    };
}

dotenv.config();
const dependencies = startServerDependencies();
new App(dependencies).start();
