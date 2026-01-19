import { test as base, expect } from '@playwright/test';
import { loginViaApi } from '../helpers/api/auth';
import { user } from '../test-data/auth/user.data';

export const test = base.extend<{
  authToken: string;
  authTokenB: string;
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
