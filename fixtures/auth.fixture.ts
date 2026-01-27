import { test as base, expect } from '@playwright/test';
import type { AuthToken } from '../types/auth';
import { loginViaApi } from '../helpers/api/auth';
import { user as testUser, userB } from '../test-data/auth/user.data';

export const test = base.extend<{
  authToken: AuthToken;
  authTokenB: AuthToken;
  authUser: typeof testUser;
  authUserB: typeof testUser;
}>({
  authUser: async ({}, use) => {
    await use(testUser);
  },

  authToken: async ({ request }, use) => {
    const token = await loginViaApi(request, testUser);
    await use(token);
  },

  authUserB: async ({}, use) => {
    await use(userB);
  },

  authTokenB: async ({ request }, use) => {
    const token = await loginViaApi(request, userB);
    await use(token);
  },
});

export { expect };
