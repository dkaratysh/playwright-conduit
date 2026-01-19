import { test, expect } from '../../../../fixtures/auth.fixture';
import { validateUserSchema } from "../../../../helpers/api/userSchema";

test('GET /api/user - validate user schema', async ({request, authToken}) => {
    const response = await request.get('/api/user', {
        headers: {Authorization: `Token ${authToken}`}
    });
    
    const user = await response.json();
    expect(response.status()).toBe(200)
    validateUserSchema(user.user)
    expect (authToken.split('.')).toHaveLength(3)

});