/// <reference types="@types/jest" />;
/**
* @group auth
*/

import { MailHandler } from '@handlers';
import { mockSendMail, server, setupBeforeAndAfter } from '../../setup/testsSetup';
import { saveTestUser } from '../../helpers';

const endpoint = '/auth/sendVerificationCode';

describe('Send Verification Code', () => {
    setupBeforeAndAfter();
    const invalidBodyCases = [
        [400, 'email', '', 'empty'],
        [400, 'email', 'notAEmail', 'not a email'],
    ]

    invalidBodyCases.forEach(([status, field, value, description]) => {
        it(`should return ${status} when provided with an ${description} ${field}`, async () => {
            const response = await server.post(endpoint).send({ [field]: value });
            expect(response.status).toBe(status);
        });
    });

    it('should return create a verification code when provided with an email', async () => {
        MailHandler.prototype.sendMail = mockSendMail;
        const response = await server.post(endpoint).send({ email: 'test@test.com' });
        expect(response.status).toBe(201);
        expect(mockSendMail).toHaveBeenCalledTimes(1);

    });

    it('should return an error when provided with an existing email', async () => {
        const email = 'test@test.com';
        saveTestUser(email, 'password');
        MailHandler.prototype.sendMail = mockSendMail;
        const response = await server.post(endpoint).send({ email });
        expect(response.status).toBe(409);
        expect(mockSendMail).toHaveBeenCalledTimes(1);
    });

});
