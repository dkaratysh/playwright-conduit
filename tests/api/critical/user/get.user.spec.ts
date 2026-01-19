import { test, expect } from '../../../../fixtures/auth.fixture';
import { user as tesUser } from '../../../../test-data/auth/user.data';

test.describe('GET /api/user', () => {
  test('authorized user should get profile', async ({ request, authToken }) => {
    const response = await request.get('/api/user', {
      headers: { Authorization: `Token ${authToken}` },
    });

    expect(response.status()).toBe(200);

    const { user } = await response.json();
    expect(user.email).toBe(tesUser.email);
    expect(user.token).toBeTruthy();
  });

  test('unauthorized user should get 401', async ({ request }) => {
    const response = await request.get('/api/user');
    expect(response.status()).toBe(401);
  });
});
