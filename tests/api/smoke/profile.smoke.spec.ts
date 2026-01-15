import { test, expect } from '@playwright/test';
import { user } from '../../../test-data/auth/user.data';

test(' GET /api/profiles/:username returns profile information', async ({
  request,
}) => {

  const response = await request.get(`/api/profiles/${user.username}`);

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body).toHaveProperty('profile');
  expect(body.profile).toHaveProperty('username', user.username);
});
