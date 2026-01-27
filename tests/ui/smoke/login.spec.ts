import { test, expect } from '@playwright/test';
import { user } from '../../../test-data/auth/user.data';
import { Pages } from '../../../pages/pages.factory';

  test('login and open home page', async ({ page }) => {
    let pages: Pages;
    pages = new Pages(page);

    await pages.login.openLoginPage();
    await pages.login.login(user.email, user.password);
    await expect(pages.home.yourFeedTab).toBeVisible();
  });


