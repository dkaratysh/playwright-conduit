import { test, expect } from '../../fixtures/article.fixture';
import type { Article } from '../../types/article';

test('API e2e - Follow the author and get followed article in user feed', async ({
  request,
  article,
  foreignUserToken,
}) => {
  const username = article.author.username;
  const slug = article.slug;

  await test.step('POST /api/profiles/:username/follow - foreign user follows the owner', async () => {
    const response = await request.post(`/api/profiles/${username}/follow`, {
      headers: { Authorization: `Token ${foreignUserToken}` },
    });

    expect(response.status()).toBe(200);

    const { profile } = await response.json();
    expect(profile.username).toBe(username);
    expect(profile.following).toBeTruthy();
  });

  await test.step('GET /api/articles/feed - check the followed article in feed ', async () => {
    const response = await request.get(`/api/articles/feed`, {
      headers: { Authorization: `Token ${foreignUserToken}` },
    });

    expect(response.status()).toBe(200);

    const { articles } = await response.json() as {
      articles: Article[];
    };

    const articleFromFeed = articles.find(article => article.slug === slug);

    expect(articleFromFeed).toBeDefined();

    if (!articleFromFeed) {
      throw new Error(`Article with slug "${slug}" was not found in feed`);
    }

    expect(articleFromFeed.author.username).toBe(username);
  });
});
