/// <reference types="@types/jest" />;
/**
* @group auth
*/

import { server, setupBeforeAndAfter } from '../../setup/testsSetup';
import { saveTestUser } from '../../helpers';

describe('Login User', () => {
    setupBeforeAndAfter();
    it('should refresh credentials when called with the correct refresh token', async () => {
        const email = 'test@test.com'
        const password = '123456';
        await saveTestUser(email, password);
        const response = await server.post('/users/login')
            .send({
                email,
                password
            });
        const refreshToken = response.body.refreshToken;
        const refreshResponse = await server.post('/users/refreshCredentials')
            .send({
                refreshToken
            });
        expect(refreshResponse.status).toBe(201);
        expect(refreshResponse.body).toHaveProperty('token');
        expect(refreshResponse.body).toHaveProperty('refreshToken');
    });
});
