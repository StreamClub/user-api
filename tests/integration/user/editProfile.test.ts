/// <reference types="@types/jest" />;
/**
* @group user
*/

import { saveTestUser } from '../../helpers';
import { generateTestJwt, getUserId } from '../../helpers/JwtHelpers';
import { server, setupBeforeAndAfter } from '../../setup/testsSetup';

const endpoint = '/users';

describe('Edit User Profile', () => {
    setupBeforeAndAfter();

    const invalidBodyCases = [
        [400, 'displayName', '', 'empty'],
        [400, 'displayName', 'a'.repeat(256), 'too long'],
    ]

    invalidBodyCases.forEach(([status, field, value, description]) => {
        it(`should return ${status} when provided with an ${description} ${field}`, async () => {
            const testJwt = generateTestJwt(1, 'test@test.com');
            const displayName = value;
            const response = await server.patch(`${endpoint}/`)
                .send({
                    displayName
                })
                .set('Authorization', `Bearer ${testJwt}`);
            expect(response.status).toBe(status);
        });
    });

    it('should return 404 when provided with an unknown userId', async () => {
        const testJwt = generateTestJwt(1, 'test@test.com');
        const newDisplayName = 'newName';
        const response = await server.patch(`${endpoint}/`)
            .send({
                displayName: newDisplayName
            })
            .set('Authorization', `Bearer ${testJwt}`);
        expect(response.status).toBe(404);

    });

    it('should update the user data', async () => {
        const tokens = await saveTestUser('test@test.com', 'test');
        const userId = getUserId(tokens.token);
        const newDisplayName = 'newName';
        const testJwt = generateTestJwt(userId, 'test@test.com');
        const response = await server.patch(`${endpoint}`)
            .send({
                displayName: newDisplayName
            })
            .set('Authorization', `Bearer ${testJwt}`);
        expect(response.status).toBe(200);
        const user = response.body;
        expect(user.id).toBe(1);
        expect(user.email).toBe('test@test.com');
        expect(user.userName).toBe('test1');
        expect(user.displayName).toBe(newDisplayName);
        expect(user.password).toBeUndefined();
    });
});
