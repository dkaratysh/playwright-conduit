import { test } from '../../../../fixtures/article.fixture';
import { validateArticleSchema } from '../../../../helpers/api/articleSchema';

test('POST /api/articles - created article response should match schema', async ({
  article,
}) => {
  validateArticleSchema(article);
});
