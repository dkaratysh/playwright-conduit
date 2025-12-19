import { test, expect } from '@playwright/test';
import { validUser } from '../../test-data/auth/user.data';
import { LoginPage } from '../../pages/LoginPage.js';

test.describe('Login tests', () => {
  test('login and open home page', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.openLoginPage();
    await loginPage.login(validUser.email, validUser.password);
    await expect(page.getByRole('button', { name: 'Your Feed' })).toBeVisible();
  });

  test('login with invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.openLoginPage();
    await loginPage.login(validUser.email, 'InvalidPassword123');
    await expect(loginPage.errorMessage).toHaveText('Wrong email/password combination');
  });
});
