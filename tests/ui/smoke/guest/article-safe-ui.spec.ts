import { test } from '../../../../fixtures/article.fixture';
import { Pages } from '../../../../pages/pages.factory';

test('Guest user can not see edit/delete buttons', async ({ page, article }) => {
  const pages = new Pages(page);

  await pages.article.openArticle(article.slug);
  await pages.article.assertOpened(article.slug);

  await pages.article.expectEditButtonHidden();
  await pages.article.expectDeleteButtonHidden();
});
