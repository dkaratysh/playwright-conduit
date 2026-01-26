import { test as setup, expect } from '@playwright/test';
import { Pages } from '../../pages/pages.factory';

setup('authenticate user and save storage state', async ({ page }) => {
  let pages: Pages;
  pages = new Pages(page);

  if (!process.env.USER_EMAIL || !process.env.USER_PASS) {
    throw new Error('ENV missing: USER_EMAIL / USER_PASS');
  }

  await pages.login.openLoginPage();
  await pages.login.login(process.env.USER_EMAIL!, process.env.USER_PASS!);

  await expect(pages.home.yourFeedTab).toBeVisible();

  await page.context().storageState({
    path: '.auth/user.json',
  });
});
