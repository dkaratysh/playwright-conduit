import { test as base, expect } from '@playwright/test';
import type { AuthToken } from '../types/auth';
import { loginViaApi } from '../helpers/api/auth';
import { user } from '../test-data/auth/user.data';

export const test = base.extend<{
  authToken: AuthToken;
  authTokenB: AuthToken;
}>({
  authToken: async ({ request }, use) => {
    const token = await loginViaApi(request, user);
    await use(token);
  },
  authTokenB: async ({ request }, use) => {
    const token = await loginViaApi(request, user);
    await use(token);
  },
});

export { expect };
