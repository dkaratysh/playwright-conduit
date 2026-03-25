import { test, expect } from '../../fixtures/article.fixture';
import { parseArticleFromApi, parseArticlesFromApi } from '../../types/article';

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

      const { article: rawArticle } = (await response.json()) as { article: any };
      const articleFromApi = parseArticleFromApi(rawArticle);
      expect(articleFromApi.slug).toBe(slug);
      expect(articleFromApi.author.username).toBe(authorUsername);
      expect(articleFromApi.favorited).toBe(true);
    });

    await test.step('GET /api/articles?favorited=:username', async () => {
      const response = await request.get(`/api/articles?favorited=${username}`, {
        headers: { Authorization: `Token ${token}` },
      });

      expect(response.status()).toBe(200);

      const { articles: rawArticles } = (await response.json()) as { articles: any[] };
      const typedArticles = parseArticlesFromApi(rawArticles);
      const articlesFromFavorite = typedArticles.find(article => article.slug === slug);

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

      const { article: rawArticle } = (await response.json()) as { article: any };
      const articleFromApi = parseArticleFromApi(rawArticle);

      expect(articleFromApi.slug).toBe(slug);
      expect(articleFromApi.author.username).toBe(authorUsername);
      expect(articleFromApi.favorited).toBe(false);
    });

    await test.step('GET /api/articles?favorited=:username', async () => {
      const response = await request.get(`/api/articles?favorited=${username}`, {
        headers: { Authorization: `Token ${token}` },
      });
      expect(response.status()).toBe(200);

      const { articles: rawArticles } = (await response.json()) as { articles: any[] };
      const typedArticles = parseArticlesFromApi(rawArticles);
      const articleFromFeed = typedArticles.find(article => article.slug === slug);

      expect(articleFromFeed).toBeUndefined();
    });
  });
});
