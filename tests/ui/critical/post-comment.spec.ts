import { test } from '../../../fixtures/article.fixture';
import { Pages } from '../../../pages/pages.factory';

test('Owner can add and delete comment', async ({ article, page }) => {
  let pages: Pages;
  pages = new Pages(page);

  const commentText = 'This is a test comment.';

  await test.step('Post a comment and verify it is visible', async () => {
    await pages.article.openArticle(article.slug);
    await pages.article.assertOpened(article.slug);
    await pages.article.postComment(commentText);

    await pages.article.expectCommentVisible(commentText);
  });

  await test.step('Delete comment and verify it is gone', async () => {
    await pages.article.deleteComment(commentText);

    await pages.article.expectNoComments(commentText);
  });
});
