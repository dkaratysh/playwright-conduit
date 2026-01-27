import { test } from '@playwright/test';
import { Pages } from '../../../../pages/pages.factory';

test('Guest can navigate to an article from home page', async ({ page }) => {
  const pages = new Pages(page);

  await page.goto('/');
  await pages.home.openfirstArticle();
  await pages.article.assertOpened();
});
