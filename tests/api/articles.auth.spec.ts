import { test, expect } from '@playwright/test';
import { buildArticleData } from '../../test-data/article.factory';
import { createArticle } from '../../helpers/api/article.helper';

test.describe('Articles API — unauthorized access', () => {
  test('Cannot create article without auth', async ({ request }) => {
    const articleData = buildArticleData();

    const response = await request.post('/api/articles', {
      data: {
        article: {
          title: articleData.title,
          description: articleData.description,
          body: articleData.body,
        },
      },
    });

    expect(response.status()).toBe(401);

    const body = await response.json();
    expect(body).toHaveProperty('errors');
  });

  test('Cannot update article without auth', async ({ request }) => {
    const article = await createArticle(request);

    const response = await request.put(`/api/articles/${article.slug}`, {
      data: {
        article: {
          title: 'Hack title',
        },
      },
    });

    expect(response.status()).toBe(401);

    const body = await response.json();
    expect(body).toHaveProperty('errors');
  });

  test('Cannot delete article without auth', async ({ request }) => {
    const article = await createArticle(request);

    const response = await request.delete(`/api/articles/${article.slug}`);

    expect(response.status()).toBe(401);
    const body = await response.json();
    expect(body).toHaveProperty('errors');
  });
});
