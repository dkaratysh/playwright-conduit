export type ArticleFactoryData = {
  title: string;
  description: string;
  body: string;
  tags: string[];
};

export function buildArticleData(overrides: Partial<ArticleFactoryData> = {}): ArticleFactoryData {
  return {
    title: overrides.title ?? `Test article ${Date.now()}`,
    description: overrides.description ?? 'About Playwright',
    body: overrides.body ?? 'This article was created by Playwright test',
    tags: overrides.tags ?? ['playwright'],
  };
}
