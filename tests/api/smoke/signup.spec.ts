import { test, expect } from '@playwright/test';
import { createTempUser } from '../../../helpers/api/temp.user';

test('POST api/users registers a new user and login successfully', async ({ request }) => {
  const tempUser = await createTempUser(request);
  const loginResponse = await request.post('api/users/login', {
    data: { user: { email: tempUser.email, password: tempUser.password } },
  });

  expect(loginResponse.ok()).toBeTruthy();
  const body = await loginResponse.json();
  expect(body).toHaveProperty('user.token');
  expect(typeof body.user.token).toBe('string');
});
