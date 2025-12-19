import { test as setup, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

setup('authenticate user and save storage state', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.openLoginPage();
  await loginPage.login(process.env.USER_EMAIL!, process.env.USER_PASS!);

  await expect(page.getByRole('button', { name: 'Your Feed' })).toBeVisible();

  await page.context().storageState({
    path: '.auth/user.json',
  });
});
