import { test as base, expect } from '@playwright/test';
import { loginViaApi } from '../helpers/api/auth';
import { createArticle, deleteArticle } from '../helpers/api/article';
import { user, userB } from '../test-data/auth/user.data';
import type { Article, ArticleSlug } from '../types/article';
import type { AuthToken } from '../types/auth';

interface ArticleOwnershipToken extends Omit<Article, 'slug'> {
  slug: ArticleSlug;
  ownerToken: AuthToken;
}

interface ForeignUser {
  token: AuthToken;
  username: string;
}

interface ArticleOwnershipFixtures {
  article: ArticleOwnershipToken;
  foreignUser: ForeignUser;
}

export const test = base.extend<ArticleOwnershipFixtures>({
  article: async ({ request }, use) => {
    const ownerToken = await loginViaApi(request, user);
    const article = await createArticle(request, { token: ownerToken });

    const mutableArticle: ArticleOwnershipToken = {
      ...article,
      slug: article.slug as ArticleSlug,
      ownerToken,
    };

    await use(mutableArticle);

    await deleteArticle(request, mutableArticle.slug, ownerToken);
  },

  foreignUser: async ({ request }, use) => {
    const token = await loginViaApi(request, userB);
    await use({
      token,
      username: userB.username,
    });
  },
});

export { expect };
