import { defineConfig, devices } from '@playwright/test';
import 'dotenv/config';

const baseURL = process.env.BASE_URL ?? 'https://conduit-realworld-example-app.fly.dev';
export default defineConfig({
  workers: process.env.CI ? 2 : undefined,
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  
  use: {
    baseURL,
    screenshot: 'only-on-failure',
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
      retries: 0,
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
        video: 'retain-on-failure',
      },
    },
    {
      name: 'e2e',
      testDir: './tests/e2e',
      dependencies: ['setup'],
      use: {
        ...devices['Desktop Chrome'],
        storageState: '.auth/user.json',
        video: 'retain-on-failure'
      },
    },
    {
      name: 'mock',
      testDir: './tests/mock',
      use: {
        ...devices['Desktop Chrome'],
        video: 'retain-on-failure'
      },
    },
  ],

  timeout: 60_000,
});
