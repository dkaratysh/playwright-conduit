import { test as base, expect } from '@playwright/test';
import { loginViaApi } from '../helpers/api/auth.helper';
import { createArticle, deleteArticle } from '../helpers/api/article.helper';
import { user, userB } from '../test-data/auth/user.data';
import type { Article } from '../types/article';

type ArticleOwnershipFixtures = {
  article: Article & { ownerToken: string }; // добавляем ownerToken внутрь article
  foreignUserToken: string;
};

export const test = base.extend<ArticleOwnershipFixtures>({
  article: async ({ request }, use) => {
    const ownerToken = await loginViaApi(request, user);
    const article = await createArticle(request, { token: ownerToken });

    const mutableArticle: Article & { ownerToken: string } = {
      ...article,
      ownerToken,
    };

    await use(mutableArticle);

    await deleteArticle(request, mutableArticle.slug, ownerToken);
  },

  foreignUserToken: async ({ request }, use) => {
    const token = await loginViaApi(request, userB);
    await use(token);
  },
});

export { expect };
