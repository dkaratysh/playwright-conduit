import { test, expect } from '@playwright/test';
import { user } from '../../../test-data/auth/user.data';

test('POST /api/users/login returns token', async ({ request }) => {
  const response = await request.post('/api/users/login', {
    data: {
      user: {
        email: user.email,
        password: user.password,
      },
    },
  });

  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(body).toHaveProperty('user');
  expect(body.user).toHaveProperty('token');

  expect(typeof body.user.token).toBe('string');
  expect(body.user.token.length).toBeGreaterThan(10);
});
