import { test, expect } from '../../../../fixtures/article.fixture';

test.describe('api/articles — unauthorized access', () => {
  test('Cannot update article of another user', async ({ request, article, foreignUser }) => {
    const response = await request.put(`/api/articles/${article.slug}`, {
      headers: {
        Authorization: `Token ${foreignUser.token}`,
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

  test('Cannot delete article of another user', async ({ request, article, foreignUser }) => {
    const response = await request.delete(`/api/articles/${article.slug}`, {
      headers: {
        Authorization: `Token ${foreignUser.token}`,
      },
    });

    expect(response.status()).toBe(403);
    const body = await response.json();

    expect(body).toHaveProperty('errors.body');
    expect(body.errors.body).toContain('You are not the author of this article');
  });
});
