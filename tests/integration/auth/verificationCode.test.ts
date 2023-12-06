/// <reference types="@types/jest" />;
/**
* @group auth
*/

import { MailHandler } from '@handlers';
import { mockSendMail, server, setupBeforeAndAfter } from '../../setup/testsSetup';

describe('Send Verification Code', () => {
    setupBeforeAndAfter();
    it('should return 201 when provided with an email', async () => {
        MailHandler.prototype.sendMail = mockSendMail;
        const response = await server.post('/users/sendVerificationCode').send({ email: 'test@test.com' });
        expect(response.status).toBe(201);
        expect(mockSendMail).toHaveBeenCalledTimes(1);

    });

    const invalidBodyCases = [
        [400, 'email', '', 'empty'],
        [400, 'email', 'notAEmail', 'not a email'],
    ]

    invalidBodyCases.forEach(([status, field, value, description]) => {
        it(`should return ${status} when provided with an ${description} ${field}`, async () => {
            const response = await server.post('/users/sendVerificationCode').send({ [field]: value });
            expect(response.status).toBe(status);
        });
    });
});
