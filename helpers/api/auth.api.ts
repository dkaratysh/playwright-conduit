import { expect } from '@playwright/test';
import type { APIRequestContext } from '@playwright/test';

export async function loginViaApi(request: APIRequestContext): Promise<string> {
  const response = await request.post('/api/users/login', {
    data: {
      user: {
        email: process.env.USER_EMAIL,
        password: process.env.USER_PASS,
      },
    },
  });

  expect(response.status()).toBe(200);

  const body = await response.json();
  return body.user.token;
}
