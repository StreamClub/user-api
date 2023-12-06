/// <reference types="@types/jest" />;
/**
* @group auth
*/

import { server, setupBeforeAndAfter } from '../../setup/testsSetup';
import { saveTestUser } from '../../helpers';

describe('Login User', () => {
    setupBeforeAndAfter();
    it('should refresh credentials when called with the correct refresh token', async () => {
        const email = 'test@test.com';
        const password = '123456';
        const { refreshToken, token } = await saveTestUser(email, password);
        const response = await server.post('/users/refreshCredentials')
            .send({
                refreshToken
            });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('token');
        expect(response.body).toHaveProperty('refreshToken');
        expect(response.body.refreshToken).not.toBe(refreshToken);
        expect(response.body.token).not.toBe(token);
    });

    it('should return 401 when called with an invalid refresh token', async () => {
        const email = 'test@test.com';
        const password = '123456';
        await saveTestUser(email, password);
        const response = await server.post('/users/refreshCredentials')
            .send({
                refreshToken: 'invalidRefreshToken'
            });
        expect(response.status).toBe(401);
    });

    it('should return 401 when called with a token', async () => {
        const email = 'test@test.com';
        const password = '123456';
        const { token } = await saveTestUser(email, password);
        const response = await server.post('/users/refreshCredentials')
            .send({
                refreshToken: token
            });
        expect(response.status).toBe(401);
    });

    it('should return 401 when called with an expired refresh token', async () => {
        const email = 'test@test.com';
        const password = '123456';
        const { refreshToken } = await saveTestUser(email, password);
        jest.useFakeTimers();
        jest.setSystemTime(new Date(Date.now() + 1000 * 60 * 60 * 24 * 31));
        const response = await server.post('/users/refreshCredentials')
            .send({
                refreshToken
            });
        expect(response.status).toBe(401);
        jest.useRealTimers();
    });

});
