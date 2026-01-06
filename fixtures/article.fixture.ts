import { test as base } from '@playwright/test';
import { loginViaApi } from '../helpers/api/auth.helper';
import { createArticle } from '../helpers/api/article.helper';
import { user, userB } from '../test-data/auth/user.data';

type ArticleOwnershipFixtures = {
  article: {
    slug: string;
  };
  foreignUserToken: string;
};

export const test = base.extend<ArticleOwnershipFixtures>({
  article: async ({ request }, use) => {
    const ownerToken = await loginViaApi(request, user);
    const article = await createArticle(request, {
      token: ownerToken,
    });

    await use(article);

    await request.delete(`/api/articles/${article.slug}`, {
      headers: {
        Authorization: `Token ${ownerToken}`,
      },
    });
  },

  foreignUserToken: async ({ request }, use) => {
    const token = await loginViaApi(request, userB);
    await use(token);
  },
});

export { expect } from '@playwright/test';


