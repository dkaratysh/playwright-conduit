import { test, expect } from '@playwright/test';
import { loginViaApi } from '../../../../helpers/api/auth';
import { user as tesUser } from '../../../../test-data/auth/user.data'

test.describe('GET /api/user', () => {
  test('authorized user should get profile', async ({ request }) => {
    const token = await loginViaApi(request);
    const response = await request.get('/api/user', {
      headers: { Authorization: `Token ${token}` },
    });
    const body = await response.json();
    const responseBody = body.user

    expect(response.status()).toBe(200);
    expect(responseBody.email).toBe(tesUser.email);
    expect(responseBody.token).toBeTruthy();
  });

  test('unauthorized user should get 401', async ({ request }) => {
    const response = await request.get('/api/user');
    expect(response.status()).toBe(401);
  });
});
