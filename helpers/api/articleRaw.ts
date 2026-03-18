import type { APIRequestContext } from '@playwright/test';
import { buildArticleData, type ArticleInput } from '../../test-data/factories/article.factory';
import type { APIResponse } from '@playwright/test';
import type { CreateArticleOptions } from './article';
import type { CreateArticleResponse } from './article';

type CreateArticleRawResponse = {
  response: APIResponse;
  data?: CreateArticleResponse;
};

export async function createArticleRaw(
  request: APIRequestContext,
  options: CreateArticleOptions,
): Promise<CreateArticleRawResponse> {
  const { token, overrides } = options;

  const articleData: ArticleInput = buildArticleData(overrides);

  const response = await request.post('/api/articles', {
    data: { article: articleData },
    headers: {
      Authorization: `Token ${token}`,
    },
  });

  let data: CreateArticleResponse | undefined;

  try {
    const text = await response.text();
    data = text ? JSON.parse(text) : undefined;
  } catch {}

  return { response, data };
}
