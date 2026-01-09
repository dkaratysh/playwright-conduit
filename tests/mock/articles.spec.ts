import { test } from '../../fixtures/network.fixture';
import { Pages } from '../../pages/pages.factory';

test('Global Feed — mocked articles', async ({ page, mockArticles }) => {
  const pages = new Pages(page);
  const home = pages.home;

  await mockArticles('default');
  await page.goto('/');
  await home.navigateToGlobalFeed();

  await home.expectMockedArticle('Mocked Article from Playwright');
});
