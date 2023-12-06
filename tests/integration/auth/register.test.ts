/// <reference types="@types/jest" />;
/**
* @group auth
*/

import { server, setupBeforeAndAfter } from '../../setup/testsSetup';
import { saveTestVerificationCode } from '../../helpers/verificationCodeHelper';


describe('Register User', () => {
    setupBeforeAndAfter();
    it('should return 201 when provided with an email', async () => {
        const email = 'test@test.com';
        const verificationCode = await saveTestVerificationCode(email);
        const response = await server.post('/users/register')
            .send({
                email,
                password: '123456',
                verificationCode
            });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('token');
        expect(response.body).toHaveProperty('refreshToken');
    });

    const invalidBodyCases = [
        [400, 'email', '', 'empty'],
        [400, 'email', 'notAEmail', 'not a email'],
        [400, 'password', '', 'empty'],
        [400, 'password', '12345', 'less than 6 characters'],
        [400, 'verificationCode', '', 'empty'],
        [400, 'verificationCode', '123456', 'nonexisting verification code'],
        [400, 'verificationCode', '12345', 'less than 6 characters'],
        [400, 'verificationCode', '12345', 'more than than 6 characters'],
    ]

    invalidBodyCases.forEach(([status, field, value, description]) => {
        it(`should return ${status} when provided with an ${description} ${field}`, async () => {
            const response = await server.post('/users/register').send({ [field]: value });
            expect(response.status).toBe(status);
        });
    });
});
