import type { Article } from '../../types/article';

export type ArticleInput = Pick<
  Article,
  'title'| 'description' | 'body' | 'tagList'
>;

export function buildArticleData(overrides: Partial<ArticleInput> = {}): ArticleInput {
  return {
    title: overrides.title ?? `Test article ${Date.now()}`,
    description: overrides.description ?? 'About Playwright',
    body: overrides.body ?? 'This article was created by Playwright test',
    tagList: overrides.tagList ?? ['playwright'],
  };
}
