import { defineConfig, devices } from '@playwright/test';
import 'dotenv/config';

const baseURL = process.env.BASE_URL ?? 'https://conduit-realworld-example-app.fly.dev';
export default defineConfig({
  use: {
    baseURL,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },
  testDir: './tests',
  reporter: [
  ['html', { outputFolder: 'playwright-report', open: 'never' }],
  ['allure-playwright', { outputFolder: 'allure-results' }],
],
  projects: [
    {
      name: 'setup',
      testMatch: /.*auth\.setup\.spec\.ts/,
      timeout: 120_000,
      use: {
        baseURL,
      },
    },
    {
      name: 'api',
      testDir: './tests/api',
      use: {
        ...devices['Desktop Chrome'],
      },
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
      name: 'e2e',
      testDir: './tests/e2e',
      dependencies: ['setup'],
      use: {
        ...devices['Desktop Chrome'],
        storageState: '.auth/user.json',
      },
    },
    {
      name: 'mock',
      testDir: './tests/mock',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
  ],

  timeout: 60_000,
});
