import { test } from '../../../fixtures/article.fixture';
import { Pages } from '../../../pages/pages.factory';
  
test('Owner can delete own article', async ({ page, article }) => {
    let pages: Pages;
    pages = new Pages(page);

    await pages.article.openArticle(article.slug);
    await pages.article.assertOpened(article.slug);
    await pages.article.deleteArticle();

    await pages.home.assertOpened();;
});