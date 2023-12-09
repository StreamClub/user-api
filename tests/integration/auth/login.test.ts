/// <reference types="@types/jest" />;
/**
* @group auth
*/

import { server, setupBeforeAndAfter } from '../../setup/testsSetup';
import { saveTestUser } from '../../helpers';

const endpoint = '/users/login';

describe('Login User', () => {
    setupBeforeAndAfter();

    const invalidBodyCases = [
        [400, 'email', '', 'empty'],
        [400, 'email', 'notAEmail', 'not a email'],
        [400, 'password', '', 'empty'],
        [400, 'password', '12345', 'less than 6 characters'],
    ]

    invalidBodyCases.forEach(([status, field, value, description]) => {
        it(`should return ${status} when provided with an ${description} ${field}`, async () => {
            const response = await server.post(endpoint).send({ [field]: value });
            expect(response.status).toBe(status);
        });
    });

    it('should login the user when provided with a proper mail and password', async () => {
        const email = 'test@test.com'
        const password = '123456';
        await saveTestUser(email, password);
        const response = await server.post(endpoint)
            .send({
                email,
                password
            });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');
        expect(response.body).toHaveProperty('refreshToken');
    });

    it('should return an error when provided with a wrong password', async () => {
        const email = 'test@test.com'
        const password = '123456';
        await saveTestUser(email, password);
        const response = await server.post(endpoint)
            .send({
                email,
                password: 'wrongPassword'
            });
        expect(response.status).toBe(404);
    });

    it('should return an error when provided with a wrong email', async () => {
        const email = 'test@test.com'
        const password = '123456';
        await saveTestUser(email, password);
        const response = await server.post(endpoint)
            .send({
                email: 'wrong@email.test',
                password
            });
        expect(response.status).toBe(400);
    });

    it('should return an error when provided with an nonexisting user credentials', async () => {
        const email = 'test@test.com'
        const password = '123456';
        const response = await server.post(endpoint)
            .send({
                email,
                password
            });
        expect(response.status).toBe(404);
    });
});
