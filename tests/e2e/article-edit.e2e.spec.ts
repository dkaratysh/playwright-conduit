import { test, expect } from '../../fixtures/article.fixture';
import { makeUpdatedArticle } from '../../helpers/ui/article.helpers';
import type { Article } from '../../types/article';
import { Pages } from '../../pages/pages.factory';
import { toArticleSlug } from '../../types/article';

test.describe('Article edit flow (API - UI - API)', () => {
  test('user edits article via UI', async ({ page, request, article }) => {
    const pages = new Pages(page);
    const updatedArticle: Article = makeUpdatedArticle(article);

    await test.step('Edit article via UI', async () => {
      await pages.article.openArticle(article.slug);
      await pages.article.assertOpened(article.slug);
      await pages.article.updateArticle(updatedArticle);

      await pages.article.expectTitle(updatedArticle.title);
      article.slug = toArticleSlug(page.url().split('/article/')[1]);
    });

    await test.step('Verify updated article via API', async () => {
      const response = await request.get(`/api/articles/${article.slug}`, {
        headers: {
          Authorization: `Token ${article.ownerToken}`,
        },
      });
      expect(response.status()).toBe(200);

      const body = await response.json();
      expect(body.article.title).toBe(updatedArticle.title);
      expect(body.article.body).toBe(updatedArticle.body);
    });
  });
});
