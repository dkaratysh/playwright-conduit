import { test as base, type BrowserContext, type APIRequestContext } from '@playwright/test';

export const test = base.extend<{
  loggedInContext: BrowserContext;
  apiRequest: APIRequestContext;
}>({
  apiRequest: async ({ request }, use) => {
    await use(request);
  },

  loggedInContext: async ({ browser, apiRequest }, use) => {
    const loginResponse = await apiRequest.post(`${process.env.BASE_URL}/api/users/login`, {
      data: {
        user: {
          email: process.env.USER_EMAIL!,
          password: process.env.USER_PASS!,
        },
      },
    });

    if (!loginResponse.ok()) {
      throw new Error(
        `Login failed: ${loginResponse.status()} - ${(await loginResponse.text()).slice(0, 200)}`,
      );
    }

    const storage = await apiRequest.storageState();
    const context = await browser.newContext({
      storageState: storage,
    });

    await use(context);
    await context.close();
  },
});
