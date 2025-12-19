import { defineConfig } from '@playwright/test';

export default defineConfig({
  globalSetup: './global-setup.ts',
  testDir: './tests',
  retries: 1,
  reporter: [['html'], ['line']],

  use: {
    baseURL: process.env.BASE_URL,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    headless: false,
    launchOptions: {
      slowMo: 300,
    },
  },

  projects: [
    {
      name: 'auth',
      testMatch: /tests\/setup\/auth\.setup\.spec\.ts$/,
    },
    {
      name: 'chromium',
      dependencies: ['auth'],
      use: {
        browserName: 'chromium',
        storageState: '.auth/user.json',
      },
    },
  ],
});
