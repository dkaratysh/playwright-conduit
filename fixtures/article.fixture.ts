import type { APIRequestContext } from '@playwright/test';
import type { Article } from '../fixtures/types/article';

type Credentials = {
  email: string;
  password: string;
};

type CreateArticleOptions = {
  token?: string;
  overrides?: Partial<Omit<Article, 'slug'>>;
};

export async function loginViaApi(
  request: APIRequestContext,
  credentials?: Credentials,
): Promise<string> {
  const email = credentials?.email ?? process.env.USER_EMAIL;
  const password = credentials?.password ?? process.env.USER_PASS;

  if (!email || !password) {
    throw new Error('Missing API login credentials (USER_EMAIL / USER_PASS)');
  }

  const response = await request.post('/api/users/login', {
    data: {
      user: { email, password },
    },
  });

  const text = await response.text();

  if (!response.ok()) {
    throw new Error(`Login failed: ${response.status()} — ${text}`);
  }

  const data = JSON.parse(text);
  return data.user.token as string;
}

export async function createArticle(
  request: APIRequestContext,
  options?: CreateArticleOptions,
): Promise<Article> {
  const token = options?.token ?? (await loginViaApi(request));

  const articleData = {
    title: options?.overrides?.title ?? `Test article ${Date.now()}`,
    description: options?.overrides?.description ?? 'About Playwright',
    body: options?.overrides?.body ?? 'This article was created by Playwright test',
    tagList: options?.overrides?.tagList ?? ['playwright'],
  };

  const response = await request.post('/api/articles', {
    data: { article: articleData },
    headers: {
      Authorization: `Token ${token}`,
    },
  });

  const text = await response.text();

  if (!response.ok()) {
    throw new Error(`Failed to create article: ${response.status()} — ${text}`);
  }

  const data = JSON.parse(text);
  return data.article;
}

export async function deleteArticle(
  request: APIRequestContext,
  slug: string,
  token?: string,
): Promise<void> {
  const authToken = token ?? (await loginViaApi(request));

  const response = await request.delete(`/api/articles/${slug}`, {
    headers: {
      Authorization: `Token ${authToken}`,
    },
  });

  if (response.status() === 404) return;

  const text = await response.text();

  if (!response.ok()) {
    throw new Error(`Failed to delete article: ${response.status()} — ${text}`);
  }
}
