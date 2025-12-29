import { test, expect } from '@playwright/test';
import { createArticle, deleteArticle } from '../../helpers/api/article.helper';
import { makeUpdatedArticle } from '../../helpers/ui/article.helpers';
import type { Article } from '../../types/article';
import { Pages } from '../../pages/pages.factory';

test.describe('Article edit flow (API - UI - API)', () => {
  test('user edits article via UI', async ({ page, request }) => {
    test.slow();

    let article: Article;
    let updatedArticle: Article;
    const pages = new Pages(page);

    await test.step('Create article via API', async () => {
      article = await createArticle(request);
    });

    await test.step('Edit article via UI', async () => {
      updatedArticle = makeUpdatedArticle(article);

      await pages.article.openArticle(article.slug);
      await pages.article.assertOpened(article.slug);
      await pages.article.updateArticle(updatedArticle);

      await pages.article.expectTitle(updatedArticle.title);
      const url = page.url();
      article.slug = url.split('/article/')[1];
    });

    await test.step('Verify updated article via API', async () => {
      const response = await request.get(`/api/articles/${article.slug}`);
      expect(response.status()).toBe(200);

      const body = await response.json();
      expect(body.article.title).toBe(updatedArticle.title);
      expect(body.article.body).toBe(updatedArticle.body);
    });

    await test.step('Clean up - delete article via API', async () => {
      await deleteArticle(request, article.slug);
    });
  });
});
