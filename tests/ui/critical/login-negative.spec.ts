import { test, expect } from '@playwright/test';
import { user } from '../../../test-data/auth/user.data';
import { Pages } from '../../../pages/pages.factory';

test('login with invalid credentials', async ({ page }) => {
  let pages: Pages;
  pages = new Pages(page);

  await pages.login.openLoginPage();
  await pages.login.login(user.email, 'InvalidPassword123');
  await expect(pages.login.errorMessage).toHaveText('Wrong email/password combination');
});
