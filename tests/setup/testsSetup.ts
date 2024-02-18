import { MailHandler } from "@handlers";
import { TestDb } from "./testDb";
import request from 'supertest';
import { App } from '../../src/app';
import AppDependencies from "appDependencies";

export let db: TestDb;
export let server: request.SuperTest<request.Test>;
export let mockSendMail = jest.fn();

export let appDependencies: AppDependencies;

export function setupBeforeAndAfter() {
    beforeAll(async () => {
        db = new TestDb();
        await db.initTestDb();
        const mailHandler = new MailHandler();
        appDependencies = { db, mailHandler };
        const app = new App(appDependencies);
        server = request(await app.start(false));
    });
    beforeEach(async () => await db.initTestDb());
    afterEach(async () => await db.clearDatabase());
    afterAll(async () => await db.closeDatabase());
}
