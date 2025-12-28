import { defineConfig, devices } from '@playwright/test';
import 'dotenv/config';

const baseURL =
  process.env.BASE_URL ?? 'https://conduit-realworld-example-app.fly.dev';
export default defineConfig({
  use: {
  baseURL,
},
  testDir: './tests',
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
  ],
  projects: [
    {
      name: 'setup',
      testMatch: /.*auth\.setup\.spec\.ts/,
      timeout: 120_000,
      use:{
        baseURL,
      }
    },
    {
      name: 'chromium',
      testDir: './tests/ui',
      dependencies: ['setup'],
      use: {
        ...devices['Desktop Chrome'],
        storageState: '.auth/user.json',
      },
    },
    {
    name: 'ui-mock',
    testDir: './tests/ui-mocked',
    use: {
      ...devices['Desktop Chrome'],
    },
  },
],

  timeout: 60_000,
});
