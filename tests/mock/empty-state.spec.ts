import { test} from '../../fixtures/network.fixture';
import { expect } from '@playwright/test';

test('Global Feed — empty', async ({ page, mockArticles }) => {
  await mockArticles('empty');
  await page.goto('/');
  await page.getByRole('button', { name: 'Global Feed' }).click();

  await expect(page.locator('.article-preview')).toHaveText('Articles not available.');
});
