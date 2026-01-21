import { test, expect } from '../../fixtures/article.fixture';
import type { Article } from '../../types/article';

test.describe('API e2e - Follow/Unfollow scenario', () => {
  test('Follow the author and get followed article in user feed', async ({
    request,
    article,
    foreignUser,
  }) => {
    const authorUsername = article.author.username;
    const slug = article.slug;

    await test.step('POST /api/profiles/:username/follow - foreign user follows the owner', async () => {
      const response = await request.post(`/api/profiles/${authorUsername}/follow`, {
        headers: { Authorization: `Token ${foreignUser.token}` },
      });

      expect(response.status()).toBe(200);

      const { profile } = await response.json();
      expect(profile.username).toBe(authorUsername);
      expect(profile.following).toBeTruthy();
    });

    await test.step('GET /api/articles/feed - check the followed article in feed ', async () => {
      const response = await request.get(`/api/articles/feed`, {
        headers: { Authorization: `Token ${foreignUser.token}` },
      });

      expect(response.status()).toBe(200);

      const { articles } = (await response.json()) as {
        articles: Article[];
      };

      const articleFromFeed = articles.find(article => article.slug === slug);

      expect(articleFromFeed).toBeDefined();

      if (!articleFromFeed) {
        throw new Error(`Article with slug "${slug}" was not found in feed`);
      }

      expect(articleFromFeed.author.username).toBe(authorUsername);
    });
  });

  test('Unfollow the autor and check if feed is empty', async ({
    request,
    article,
    foreignUser,
  }) => {
    const authorUsername = article.author.username;

    await test.step('POST /api/profiles/:username/follow - foreign user follows the owner', async () => {
      const response = await request.post(`/api/profiles/${authorUsername}/follow`, {
        headers: { Authorization: `Token ${foreignUser.token}` },
      });

      expect(response.status()).toBe(200);
    });

    await test.step('DELETE /api/profiles/:username/unfollow - foreign user unfollows the owner', async () => {
      const response = await request.delete(`/api/profiles/${authorUsername}/follow`, {
        headers: { Authorization: `Token ${foreignUser.token}` },
      });

      expect(response.status()).toBe(200);

      const { profile } = await response.json();
      expect(profile.username).toBe(authorUsername);
      expect(profile.following).toBe(false);
    });

    await test.step('GET /api/articles/feed - check the if the article is not in the feed ', async () => {
      const response = await request.get(`/api/articles/feed`, {
        headers: { Authorization: `Token ${foreignUser.token}` },
      });

      expect(response.status()).toBe(200);

      const { articles } = (await response.json()) as {
        articles: Article[];
      };

      const articleFromAuthor = articles.find(a => a.author.username === authorUsername);
      expect(articleFromAuthor).toBeUndefined();
    });
  });
});
