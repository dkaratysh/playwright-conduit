import { test } from '../../fixtures/network.fixture';
import { Pages } from '../../pages/pages.factory';

test('Global Feed — server error', async ({ page, mockArticles }) => {
  const pages = new Pages(page);
  const home = pages.home;

  await mockArticles('error');
  await page.goto('/');
  await home.navigateToGlobalFeed();

  await home.expectEmptyFeed();
  await home.expectPageVisible();
});
