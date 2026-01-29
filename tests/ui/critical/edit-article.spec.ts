import { test } from '../../../fixtures/article.fixture';
import { makeUpdatedArticle } from '../../../helpers/ui/article.helpers';
import { Pages } from '../../../pages/pages.factory';

test('Owner can update the article', async ({ article, page }) => {
  const updatedArticle = makeUpdatedArticle(article);
  let pages: Pages;
  pages = new Pages(page);

  await pages.article.openArticle(article.slug);
  await pages.article.assertOpened(article.slug);
  await pages.article.updateArticle(updatedArticle);

  await pages.article.expectTitle(updatedArticle.title);
  await pages.article.expectBody(updatedArticle.body);
});
