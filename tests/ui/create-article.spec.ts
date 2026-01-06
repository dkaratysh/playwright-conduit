import { test, expect } from '@playwright/test';
import { buildArticleData } from '../../test-data/factories/article.factory';
import { createArticle, deleteArticle } from '../../helpers/api/article.helper';
import { makeUpdatedArticle } from '../../helpers/ui/article.helpers';
import type { Article } from '../../types/article';
import { Pages } from '../../pages/pages.factory';
import { loginViaApi } from '../../helpers/api/loginViaApi';

test.describe('Article CRUD UI tests', () => {
  let createdArticle: Article | null = null;
  let pages: Pages;
  let token: string;

  test.beforeEach(async ({ page, request }) => {
    pages = new Pages(page);
    token = await loginViaApi(request);
  });

  test.afterEach(async ({ request }) => {
    if (createdArticle) {
      await deleteArticle(request, createdArticle.slug, token);
      createdArticle = null;
    }
  });

  test('Create new article', async ({ page }) => {
    const articleData = buildArticleData();

    await pages.home.open();
    await pages.home.goToEditor();
    await pages.editor.fillNewArticle(articleData);
    await pages.editor.publishNewArticle();

    await pages.article.assertOpened();

    const slug = page.url().split('/article/')[1];

    createdArticle = {
      ...articleData,
      slug,
      tagList: articleData.tags,
    };

    await pages.article.expectTitle(articleData.title);
    await pages.article.expectBody(articleData.body);
  });

  test('Update the article', async ({ page, request }) => {
    const article = await createArticle(request, {
      token,
      overrides: {
        title: `Test article ${Date.now()}`,
      },
    } as any);

    const updatedArticle = makeUpdatedArticle(article);

    await pages.article.openArticle(article.slug);
    await pages.article.assertOpened(article.slug);
    await pages.article.updateArticle(updatedArticle);

    const updatedSlug = page.url().split('/article/')[1];

    createdArticle = {
      ...article,
      ...updatedArticle,
      slug: updatedSlug,
    };

    await pages.article.expectTitle(updatedArticle.title);
    await pages.article.expectBody(updatedArticle.body);
  });

  test('Delete the article', async ({ page, request }) => {
    const article = await createArticle(request, { token });
    createdArticle = null;

    await pages.article.openArticle(article.slug);
    await pages.article.assertOpened(article.slug);
    await pages.article.deleteArticle();

    await expect(page).toHaveURL(/#\/$/);

    const response = await request.get(`${process.env.BASE_URL}/api/articles/${article.slug}`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    expect(response.status()).toBe(404);
  });
});
