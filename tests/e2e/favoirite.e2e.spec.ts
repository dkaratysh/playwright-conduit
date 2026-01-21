import { test, expect } from '../../fixtures/article.fixture';
import type { Article } from '../../types/article';

test.describe('API e2e - Favorite/Unfavorite scenarios', () => {
  test('Mark article as favorite and check them in Favorited articles', async ({
    request,
    article,
    foreignUser,
  }) => {
    const authorUsername = article.author.username;
    const slug = article.slug;
    const { token, username } = foreignUser;

    await test.step('POST /api/articles/:slug/favorite', async () => {
      const response = await request.post(`/api/articles/${slug}/favorite`, {
        headers: { Authorization: `Token ${token}` },
      });

      expect(response.status()).toBe(200);

      const { article } = (await response.json()) as {
        article: Article;
      };
      expect(article.slug).toBe(slug);
      expect(article.author.username).toBe(authorUsername);
      expect(article.favorited).toBe(true);
    });

    await test.step('GET /api/articles?favorited=:username', async () => {
      const response = await request.get(`/api/articles?favorited=${username}`, {
        headers: { Authorization: `Token ${token}` },
      });

      expect(response.status()).toBe(200);

      const { articles } = (await response.json()) as {
        articles: Article[];
      };
      const articlesFromFavorite = articles.find(article => article.slug === slug);
      expect(articlesFromFavorite).toBeDefined();

      if (!articlesFromFavorite) {
        throw new Error(`Article with slug "${slug}" was not found in feed`);
      }
      expect(articlesFromFavorite.author.username).toBe(authorUsername);
    });
  });

  test('Unfavorite the article and check if it is not in favorite list', async ({
    request,
    article,
    foreignUser,
  }) => {
    const authorUsername = article.author.username;
    const slug = article.slug;
    const { token, username } = foreignUser;

    await test.step('POST /api/articles/:slug/favorite', async () => {
      const response = await request.post(`/api/articles/${slug}/favorite`, {
        headers: { Authorization: `Token ${token}` },
      });
      expect(response.status()).toBe(200);
    });
    await test.step('DELETE /api/articles/:slug/favorite', async () => {
      const response = await request.delete(`/api/articles/${slug}/favorite`, {
        headers: { Authorization: `Token ${token}` },
      });
      expect(response.status()).toBe(200);
      const { article } = (await response.json()) as {
        article: Article;
      };
      expect(article.slug).toBe(slug);
      expect(article.author.username).toBe(authorUsername);
      expect(article.favorited).toBe(false);
    });
    await test.step('GET /api/articles?favorited=:username', async () => {
      const response = await request.get(`/api/articles?favorited=${username}`, {
        headers: { Authorization: `Token ${token}` },
      });
      expect(response.status()).toBe(200);

      const { articles } = (await response.json()) as {
        articles: Article[];
      };
      const articleFromFeed = articles.find(article => article.slug === slug);
      expect(articleFromFeed).toBeUndefined();
    });
  });
});
