import { test } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';
import fs from 'fs';

const authFile = '.auth/user.json';
if (!fs.existsSync('.auth')) fs.mkdirSync('.auth');

test('Authenticate user and save storage state', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.openLoginPage();
  await loginPage.login(process.env.USER_EMAIL!, process.env.USER_PASS!);
  await page.context().storageState({ path: authFile });
});
