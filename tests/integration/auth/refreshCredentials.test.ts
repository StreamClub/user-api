/// <reference types="@types/jest" />;
/**
* @group auth
*/

import { server, setupBeforeAndAfter } from '../../setup/testsSetup';
import { generateCredentials, saveTestUser } from '../../helpers';

const endpoint = '/auth/refreshCredentials';

describe('Refresh User Credentials', () => {
    setupBeforeAndAfter();

    const invalidBodyCases = [
        [400, 'refreshToken', '', 'empty'],
    ]

    invalidBodyCases.forEach(([status, field, value, description]) => {
        it(`should return ${status} when provided with an ${description} ${field}`, async () => {
            const response = await server.post(endpoint).send({ [field]: value });
            expect(response.status).toBe(status);
        });
    });

    it('should refresh credentials when called with the correct refresh token', async () => {
        const email = 'test@test.com';
        const password = '123456';
        const { refreshToken, token } = await saveTestUser(email, password);
        const response = await server.post(endpoint)
            .send({
                refreshToken
            });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('token');
        expect(response.body).toHaveProperty('refreshToken');
        expect(response.body.refreshToken).not.toBe(refreshToken);
        expect(response.body.token).not.toBe(token);
    });

    it('should return an error when called with an invalid refresh token', async () => {
        const email = 'test@test.com';
        const password = '123456';
        await saveTestUser(email, password);
        const response = await server.post(endpoint)
            .send({
                refreshToken: 'invalidRefreshToken'
            });
        expect(response.status).toBe(401);
    });

    it('should return an error when called with a token', async () => {
        const email = 'test@test.com';
        const password = '123456';
        const { token } = await saveTestUser(email, password);
        const response = await server.post(endpoint)
            .send({
                refreshToken: token
            });
        expect(response.status).toBe(401);
    });

    it('should return an error when called with an expired refresh token', async () => {
        const email = 'test@test.com';
        const password = '123456';
        const { refreshToken } = await saveTestUser(email, password);
        jest.useFakeTimers();
        jest.setSystemTime(new Date(Date.now() + 1000 * 60 * 60 * 24 * 31));
        const response = await server.post(endpoint)
            .send({
                refreshToken
            });
        expect(response.status).toBe(401);
        jest.useRealTimers();
    });

    it('should return an error when called with an old refresh token that belongs to a non-existent user', async () => {
        const email = 'test@test.com';
        const password = '123456';
        const { refreshToken: oldRefreshToken } = await saveTestUser(email, password);
        generateCredentials(email);
        const response = await server.post(endpoint)
            .send({
                refreshToken: oldRefreshToken
            });
        expect(response.status).toBe(401);
    });

});
