import { MailHandler } from "@handlers";
import { TestDb } from "./testDb";
import request from 'supertest';
import { App } from '../../src/app';

export let db: TestDb;
export let server: request.SuperTest<request.Test>;
export let mockSendMail = jest.fn();

export function setupBeforeAndAfter() {
    beforeAll(async () => {
        db = new TestDb();
        await db.initTestDb();
        const mailHandler = new MailHandler();
        const app = new App({ db, mailHandler });
        server = request(await app.start(false));
    });
    beforeEach(async () => await db.initTestDb());
    afterEach(async () => await db.clearDatabase());
    afterAll(async () => await db.closeDatabase());
}
