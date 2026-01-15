import type { APIRequestContext } from '@playwright/test';

export type TempUser = {
  username: string;
  email: string;
  password: string;
  token?: string;
};

export function generateTempUser(): TempUser {
  const randomSuffix = Date.now();
  return {
    username: `testuser${randomSuffix}`,
    email:    `test${randomSuffix}@example.com`,
    password: 'Password123!',
  };
}

export async function createTempUser(request: APIRequestContext): Promise<TempUser> {
  const user = generateTempUser();

  const response = await request.post('/api/users', {
    data: { user },
  });
  if (response.status() !== 201) {
    throw new Error(`Failed to create temp user: ${response.status()}`);
  }

  const body = await response.json();
  user.token = body.user.token;
  return user;
}
