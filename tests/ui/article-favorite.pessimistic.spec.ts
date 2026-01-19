import { test, expect } from '../../fixtures/article.fixture';
import { Pages } from '../../pages/pages.factory';
import { loginAs } from '../../helpers/ui/auth.helper';

test.skip('Favorite is not applied on API failure (pessimistic UI)', async ({
  page,
  article,
  foreignUserToken,
}) => {
  let pages: Pages;
  pages = new Pages(page);

  await test.step('Navigate to the article page', async () => {
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
  });

  await test.step('Attempt to favorite the article and verify no change occurs', async () => {
    const initialCount = await pages.article.getFavoriteCount();

    await pages.article.clickFavorite();

    expect(await pages.article.getFavoriteCount()).toBe(initialCount);
    await pages.article.expectNotFavorited();
  });
});
