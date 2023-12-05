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
});
