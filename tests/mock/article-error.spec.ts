import { test } from '../../fixtures/network.fixture';
import { expect } from '@playwright/test';

test('Global Feed — server error', async ({ page, mockArticles }) => {
  await mockArticles('error');
  await page.goto('/');
  await page.getByRole('button', { name: 'Global Feed' }).click();

  await expect(page.locator('.article-preview')).toHaveText('Articles not available.');
  await expect(page.locator('app-root, body')).toBeVisible();
});
