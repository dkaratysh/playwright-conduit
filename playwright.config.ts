import { defineConfig, devices } from '@playwright/test';
import 'dotenv/config';

export default defineConfig({
  testDir: './tests',

  projects: [
    {
      name: 'setup',
      testMatch: /.*auth\.setup\.spec\.ts/,
    },
    {
      name: 'chromium',
      dependencies: ['setup'],
      use: {
        ...devices['Desktop Chrome'],
        baseURL: process.env.BASE_URL,
        storageState: '.auth/user.json',
      },
    },
  ],

  timeout: 60_000,
});
