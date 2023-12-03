import { createMock } from 'ts-auto-mock';
import { TestDb } from "./testDb";
import AppDependencies from "../../src/appDependencies";
import { MailHandlerI } from "../../src/handlers";

const startServerDependencies = (): AppDependencies => {
    const db = new TestDb();
    const mailHandler = createMock<MailHandlerI>();
    return {
        db, mailHandler
    };
}
