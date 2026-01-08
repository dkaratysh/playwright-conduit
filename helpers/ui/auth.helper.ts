import type { Page } from '@playwright/test';

export async function loginAs(page: Page, token: string) {
  await page.addInitScript(token => {
    localStorage.setItem('jwt', token);
  }, token);
}
