import { test, expect } from '../../../fixtures/article.fixture';
import { buildArticleData } from '../../../test-data/factories/article.factory';
import { makeUpdatedArticle } from '../../../helpers/ui/article.helpers';
import { Pages } from '../../../pages/pages.factory';
import { toArticleSlug } from '../../../types/article';

test.describe('Article CRUD UI tests', () => {
  let pages: Pages;

  test.beforeEach(async ({ page }) => {
    pages = new Pages(page);
  });

  test('Create new article', async ({ page, request, article }) => {
    const articleData = buildArticleData();

    await page.goto('/');
    await pages.home.goToEditor();
    await pages.editor.fillNewArticle(articleData);
    await pages.editor.publishNewArticle();
    await pages.article.assertOpened();

    await pages.article.expectTitle(articleData.title);
    await pages.article.expectBody(articleData.body);

    const slug = page.url().split('/article/')[1];
    await request.delete(`${process.env.BASE_URL}/api/articles/${slug}`, {
      headers: { Authorization: `Token ${article.ownerToken}` },
    });
  });

  test('Update the article', async ({ article, page }) => {
    const updatedArticle = makeUpdatedArticle(article);

    await pages.article.openArticle(article.slug);
    await pages.article.assertOpened(article.slug);
    await pages.article.updateArticle(updatedArticle);

    article.slug = toArticleSlug(page.url().split('/article/')[1]);

    await pages.article.expectTitle(updatedArticle.title);
    await pages.article.expectBody(updatedArticle.body);
  });

  test('Delete the article', async ({ page, request, article }) => {
    await pages.article.openArticle(article.slug);
    await pages.article.assertOpened(article.slug);
    await pages.article.deleteArticle();

    await expect(page).toHaveURL(/#\/$/);

    const response = await request.get(`${process.env.BASE_URL}/api/articles/${article.slug}`, {
      headers: {
        Authorization: `Token ${article.ownerToken}`,
      },
    });
    expect(response.status()).toBe(404);
  });
});
