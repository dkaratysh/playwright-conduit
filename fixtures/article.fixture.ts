import type { APIRequestContext } from '@playwright/test';
import type { Article } from '../fixtures/types/article';

export async function loginViaApi(request: APIRequestContext) {
  const response = await request.post(`${process.env.BASE_URL}/api/users/login`, {
    data: {
      user: {
        email: process.env.USER_EMAIL!,
        password: process.env.USER_PASS!,
      },
    },
  });

  if (!response.ok()) {
    const text = await response.text();
    throw new Error(`Login via API failed: ${response.status()} — ${text}`);
  }

  const data = await response.json();
  return data.user.token as string;
}

export async function createArticle(
  request: APIRequestContext,
  overrides?: Partial<Omit<Article, 'slug'>>,
): Promise<Article> {
  const token = await loginViaApi(request);

  const articleData = {
    title: overrides?.title || `Test article ${Date.now()}`,
    description: overrides?.description || 'About Playwright',
    body: overrides?.body || 'This article was created by Playwright test',
    tagList: overrides?.tagList || ['playwright'],
  };

  const response = await request.post(`${process.env.BASE_URL}/api/articles`, {
    data: { article: articleData },
    headers: {
      Authorization: `Token ${token}`,
    },
  });

  if (!response.ok()) {
    const text = await response.text();
    console.error('Create Article failed:', text);
    throw new Error(`Failed to create article: ${response.status()} ${text}`);
  }

  const data = await response.json();
  return data.article;
}

export async function deleteArticle(request: APIRequestContext, slug: string) {
  const token = await loginViaApi(request);

  const response = await request.delete(`${process.env.BASE_URL}/api/articles/${slug}`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });

  if (response.status() === 404) {
    return;
  }

  if (!response.ok()) {
    const text = await response.text();
    throw new Error(`Failed to delete article: ${response.status()} ${text}`);
  }
}
