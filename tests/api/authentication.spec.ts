import { test, expect } from '../../fixtures/article.fixture';
import { buildArticleData } from '../../test-data/factories/article.factory';
import type { APIResponse } from '@playwright/test';


test.describe('Articles API — unauthorized access', () => {
  // let token: string;

  // test.beforeEach(async ({ request }) => {
  //   token = await loginViaApi(request);
  // });

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
    await expectUnauthorized(response);
  });

  test('Cannot update article without auth', async ({ request, article }) => {

    const response = await request.put(`/api/articles/${article.slug}`, {
      data: {
        article: {
          title: 'Hack title',
        },
      },
    });

    expect(response.status()).toBe(401);
    await expectUnauthorized(response);
  });

  test('Cannot delete article without auth', async ({ request, article }) => {
    const response = await request.delete(`/api/articles/${article.slug}`);

    expect(response.status()).toBe(401);
    await expectUnauthorized(response);
  });
});

async function expectUnauthorized(response: APIResponse) {
  const body = await response.json();
  expect(body).toHaveProperty('errors');
}
