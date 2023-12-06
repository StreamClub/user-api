/// <reference types="@types/jest" />;
/**
* @group auth
*/

import { server, setupBeforeAndAfter } from '../../setup/testsSetup';
import { saveTestUser } from '../../helpers';

describe('Login User', () => {
    setupBeforeAndAfter();
    it('should login the user when provided with a proper mail and password', async () => {
        const email = 'test@test.com'
        const password = '123456';
        await saveTestUser(email, password);
        const response = await server.post('/users/login')
            .send({
                email,
                password
            });
        console.log(response.body);
        expect(response.status).toBe(200);
    });
});
