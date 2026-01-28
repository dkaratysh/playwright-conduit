import { test } from '../../../../fixtures/article.fixture';
import { Pages } from '../../../../pages/pages.factory';

test('Foreign user can not see edit/delete button', async ({ page, article }) => {
    const pages = new Pages(page);
    
    await pages.article.openArticle(article.slug);
    await pages.article.assertOpened(article.slug);

    await pages.article.expectEditButtonHidden();
    await pages.article.expectDeleteButtonHidden();
});