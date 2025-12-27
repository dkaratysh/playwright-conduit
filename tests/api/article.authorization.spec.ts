import { test, expect } from '@playwright/test';
import { loginViaApi } from '../../fixtures/article.fixture';
import { createArticle } from '../../fixtures/article.fixture';
import { userA, userB } from '../../test-data/auth/user.data';

test.describe('Articles API — unauthorized access', () => {
  test('Cannot update article of another user', async ({ request }) => {
    const tokenA = await loginViaApi(request, userA);

    const article = await createArticle(request, {
      token: tokenA,
    });

    const tokenB = await loginViaApi(request, userB);

    const response = await request.put(`/api/articles/${article.slug}`, {
      headers: {
        Authorization: `Token ${tokenB}`,
      },
      data: {
        article: {
          title: 'Malicious Update Attempt',
        },
      },
    });

    expect(response.status()).toBe(403);
    const body = await response.json();

    expect(body).toHaveProperty('errors.body');
    expect(body.errors.body).toContain('You are not the author of this article');
  });

  test('Cannot delete article of another user', async ({ request }) => {
    const tokenA = await loginViaApi(request, userA);
    const article = await createArticle(request, {
      token: tokenA,
    });

    const tokenB = await loginViaApi(request, userB);
    const response = await request.delete(`/api/articles/${article.slug}`, {
      headers: {
        Authorization: `Token ${tokenB}`,
      },
    });

    expect(response.status()).toBe(403);
    const body = await response.json();

    expect(body).toHaveProperty('errors.body');
    expect(body.errors.body).toContain('You are not the author of this article');
  });
});
