import type { APIRequestContext } from '@playwright/test';
import type { UserLoginPayload } from '../../types/user';

export async function loginViaApi(
  request: APIRequestContext,
  credentials?: UserLoginPayload,
): Promise<string> {
  const email = credentials?.email ?? process.env.USER_EMAIL;
  const password = credentials?.password ?? process.env.USER_PASS;

  if (!email || !password) {
    throw new Error('Missing API login credentials (USER_EMAIL / USER_PASS)');
  }

  const response = await request.post('/api/users/login', {
    data: {
      user: { email, password },
    },
  });

  const text = await response.text();

  if (!response.ok()) {
    throw new Error(`Login failed: ${response.status()} — ${text}`);
  }

  const data = JSON.parse(text);
  return data.user.token as string;
}
