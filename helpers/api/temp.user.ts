import type { APIRequestContext } from '@playwright/test';
import type { UpdateUserPayload } from '../../types/user';

export function generateTempUser(): UpdateUserPayload {
  const randomSuffix = Date.now();
  return {
    username: `testuser${randomSuffix}`,
    email: `test${randomSuffix}@example.com`,
    password: 'Password123!',
  };
}

export async function createTempUser(request: APIRequestContext): Promise<UpdateUserPayload> {
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
