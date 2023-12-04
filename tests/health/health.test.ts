/// <reference types="@types/jest" />;
/**
* @group health
*/
import request from 'supertest';
import { TestDb } from '../setup/testDb';
import { App } from '../../src/app';
import { createMock } from 'ts-auto-mock';
import { MailHandler } from '@handlers';

let db: TestDb;
let server: request.SuperTest<request.Test>;

beforeAll(async () => {
    db = new TestDb();
    const mailHandler = new MailHandler();
    const app = new App({ db, mailHandler });
    server = request(await app.start());
});
afterEach(async () => await db.clearDatabase());
afterAll(async () => await db.closeDatabase());

describe('Health', () => {
    it('should return 200', async () => {
        const response = await server.get('/health');
        expect(response.status).toBe(200);
    });
});
