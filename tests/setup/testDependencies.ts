import { createMock } from 'ts-auto-mock';
import { TestDb } from "./testDb";
import { MailHandlerI } from "../../src/handlers";
import * as dotenv from "dotenv";
import { App } from "../../src/app";


export const getTestApp = async (): Promise<any> => {
    dotenv.config();
    const db = new TestDb();
    const mailHandler = createMock<MailHandlerI>();
    const app = new App({ db, mailHandler });
    return await app.start();
}
