import { test } from '../../../../fixtures/auth.fixture';
import { buildArticleData } from '../../../../test-data/factories/article.factory';
import { Pages } from '../../../../pages/pages.factory';

test('Create new article', async ({ page, request, authToken }) => {
  const articleData = buildArticleData();
  let pages: Pages;
  pages = new Pages(page);

  await page.goto('/');
  await pages.home.goToEditor();
  await pages.editor.fillNewArticle(articleData);
  await pages.editor.publishNewArticle();
  await pages.article.assertOpened();

  await pages.article.expectTitle(articleData.title);

  const slug = page.url().split('/article/')[1];

  await request.delete(`/api/articles/${slug}`, {
    headers: { Authorization: `Token ${authToken}` },
  });
});
