import { test } from '../../fixtures/network.fixture';
import { expect } from '@playwright/test';

test('Global Feed — mocked articles', async ({ page, mockArticles }) => {
  await mockArticles('default');

  await page.goto('/');
  await page.getByRole('button', { name: 'Global Feed' }).click();

  await expect(page.getByText('Mocked article from Playwright')).toBeVisible();
});
