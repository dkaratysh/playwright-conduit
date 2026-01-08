import { test, expect } from '../../fixtures/article.fixture';
import { Pages } from '../../pages/pages.factory';
import { loginAs } from '../../helpers/ui/auth.helper';

test('Favorite is not applied on API failure (pessimistic UI)', async ({
  page,
  article,
  foreignUserToken,
}) => {
  let pages: Pages;
  pages = new Pages(page);

  await loginAs(page, foreignUserToken);
  await page.goto('/');

  await page.route('**/api/articles/*/favorite', async route => {
    await route.fulfill({
      status: 500,
      contentType: 'application/json',
      body: JSON.stringify({
        errors: { body: ['Internal Server Error'] },
      }),
    });
  });

  await pages.article.openArticle(article.slug);
  await pages.article.assertOpened(article.slug);

  const initialCount = await pages.article.getFavoriteCount();
  const responsePromise = page.waitForResponse(
    res => res.url().includes('/favorite') && res.status() === 500,
  );

  await pages.article.clickFavorite();
  await responsePromise;

  expect(await pages.article.getFavoriteCount()).toBe(initialCount);
  await pages.article.expectNotFavorited();
});
