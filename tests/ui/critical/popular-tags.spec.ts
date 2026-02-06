import { test } from '@playwright/test';
import { Pages } from '../../../pages/pages.factory';

test('Popular tags are displayed on the homepage and lead to tag pages', async ({ page }) => {
  const pages = new Pages(page);

  await pages.home.goto();
  await pages.home.expectPopularTagsToBeVisible();
  await pages.home.clickOnTag('test');
  await pages.home.expectTagTabToBeActive('test');
});
