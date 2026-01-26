import { test, expect } from '@playwright/test';
import { user } from '../../test-data/auth/user.data';
import { Pages } from '../../pages/pages.factory';

test.describe('Login tests', () => {
  let pages: Pages;

  test.beforeEach(async ({ page }) => {
      pages = new Pages(page);
    });

  test('login and open home page', async () => {
    await pages.login.openLoginPage();
    await pages.login.login(user.email, user.password);
    await expect(pages.home.yourFeedTab).toBeVisible();
  });

  test('login with invalid credentials', async () => {
    await pages.login.openLoginPage();
    await pages.login.login(user.email, 'InvalidPassword123');
    await expect(pages.login.errorMessage).toHaveText('Wrong email/password combination');
  });
});
