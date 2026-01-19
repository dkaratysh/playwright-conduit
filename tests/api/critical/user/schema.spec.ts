import { test, expect } from '@playwright/test'
import { validateUserSchema } from "../../../../helpers/api/userSchema";
import { loginViaApi } from '../../../../helpers/api/auth';

test('GET /api/user - validate user schema', async ({request}) => {
    const token = await loginViaApi(request);
    const response = await request.get('/api/user', {
        headers: {Authorization: `Token ${token}`}
    })

    const user = await response.json();
    expect(response.status()).toBe(200)
    validateUserSchema(user.user)
    expect (token.split('.')).toHaveLength(3)

});