import { test, expect } from '@playwright/test';

test('ALLURE CHECK - forced fail', async ({ page }) => {
  await page.goto('/');
  expect(true).toBe(false); // This assertion is intended to fail for Allure report demonstration
});
