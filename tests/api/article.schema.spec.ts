import { test } from '../../fixtures/article.fixture';
import { buildArticleData } from '../../test-data/factories/article.factory';
import { validateArticleSchema } from '../../helpers/api/articleSchema.helper';
import { createArticle } from '../../helpers/api/article.helper';

test('[API][Schema] POST /api/articles - create article response should match schema', async ({ article, request }) => {
    const articleData = buildArticleData();
    const createdArticle = await createArticle(request, { token: article.ownerToken, overrides: articleData });

    validateArticleSchema(createdArticle)
});