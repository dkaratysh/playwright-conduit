import { test, expect } from '../../../../fixtures/auth.fixture';
import { user as testUser } from '../../../../test-data/auth/user.data'


test('login token works on protected endpoint', async ({request, authToken}) => {
    expect(authToken).toBeTruthy();

    const response = await request.get('/api/user', {
        headers: { Authorization: `Token ${authToken}`}
    });
    
    expect(response.status()).toBe(200);
    
    const {user} = await response.json();  
    expect(user.email).toBe(testUser.email);
});