import { test as base } from '@playwright/test';

import articles from '../test-data/mocks/articles.json' assert { type: 'json' };
import emptyArticles from '../test-data/mocks/empty-articles.json' assert { type: 'json' };
import errorResponse from '../test-data/mocks/articles-error.json' assert { type: 'json' };

type NetworkFixtures = {
  mockArticles: (scenario?: 'default' | 'empty' | 'error') => Promise<void>;
};

export const test = base.extend<NetworkFixtures>({
  mockArticles: async ({ page }, use) => {
    await use(async (scenario = 'default') => {
      let body;
      let status = 200;

      switch (scenario) {
        case 'empty':
          body = emptyArticles;
          break;
        case 'error':
          body = errorResponse;
          status = 500;
          break;
        default:
          body = articles;
      }

      await page.route('**/api/articles*', route =>
        route.fulfill({
          status,
          contentType: 'application/json',
          body: JSON.stringify(body),
        }),
      );
    });
  },
});
