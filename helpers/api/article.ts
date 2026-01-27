import type { APIRequestContext } from '@playwright/test';
import type { Article, ArticleSlug } from '../../types/article';
import { buildArticleData, type ArticleInput } from '../../test-data/factories/article.factory';
import type { AuthToken } from '../../types/auth';

type CreateArticleOptions = {
  token: AuthToken;
  overrides?: Partial<Omit<Article, 'slug'>>;
};

type CreateArticleResponse = {
  article: Article;
};

export async function createArticle(
  request: APIRequestContext,
  options: CreateArticleOptions,
): Promise<Article> {
  const { token, overrides } = options;

  const articleData: ArticleInput = buildArticleData(overrides);

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

  const data = JSON.parse(text) as CreateArticleResponse;
  return {
    ...data.article,
    slug: data.article.slug as ArticleSlug,
  };
}

export async function deleteArticle(
  request: APIRequestContext,
  slug: ArticleSlug,
  token: AuthToken,
): Promise<void> {
  if (!token) {
    throw new Error(
      'deleteArticle requires token. ' + 'Login must be done outside of article.helper.ts',
    );
  }

  const response = await request.delete(`/api/articles/${slug}`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });

  if (response.status() === 404) return;

  const text = await response.text();

  if (!response.ok()) {
    throw new Error(`Failed to delete article: ${response.status()} — ${text}`);
  }
}
