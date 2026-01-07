import { test, expect } from '../../fixtures/article.fixture';
import { Pages } from '../../pages/pages.factory';

test ('Post comment UI tests', async ({article, page}) => {
    let pages: Pages
    pages = new Pages(page);

    const commentText = "This is a test comment.";

    await pages.article.openArticle(article.slug);
    await pages.article.assertOpened(article.slug);
    await pages.article.postComment(commentText);

    await expect(
        pages.article.commentLocator.filter({ hasText: commentText }).first()
        ).toBeVisible();
})