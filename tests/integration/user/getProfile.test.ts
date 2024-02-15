/// <reference types="@types/jest" />;
/**
* @group user
*/

import { saveTestUser } from '../../helpers';
import { generateTestJwt, getUserId } from '../../helpers/JwtHelpers';
import { server, setupBeforeAndAfter } from '../../setup/testsSetup';

const endpoint = '/users';

describe('Get User Profile', () => {
    setupBeforeAndAfter();

    const invalidCases = [
        [400, 'userId', 'notANumber', 'not a number'],
        [400, 'userId', -1, 'negative number'],
        [400, 'userId', 0, 'zero'],
        [400, 'userId', 1.5, 'not integer'],
    ]

    invalidCases.forEach(([status, field, value, description]) => {
        it(`should return ${status} when provided with an ${description} ${field}`, async () => {
            const testJwt = generateTestJwt(1, 'test@test.com');
            const response = await server.get(`${endpoint}/${value}`)
                .set('Authorization', `Bearer ${testJwt}`);
            expect(response.status).toBe(status);
        });
    });

    it('should return 404 when provided with an unknown userId', async () => {
        const testJwt = generateTestJwt(1, 'test@test.com');
        const response = await server.get(`${endpoint}/${2}`)
            .set('Authorization', `Bearer ${testJwt}`);
        expect(response.status).toBe(404);
    });

    it('should return a user with the correct format when provided with a valid userId', async () => {
        const tokens = await saveTestUser('test@test.com', 'test');
        const userId = getUserId(tokens.token);
        const testJwt = generateTestJwt(userId, 'test@test.com');
        const response = await server.get(`${endpoint}/${userId}`)
            .set('Authorization', `Bearer ${testJwt}`);
        expect(response.status).toBe(200);
        const user = response.body;
        expect(user.id).toBe(1);
        expect(user.email).toBe('test@test.com');

    });
});
