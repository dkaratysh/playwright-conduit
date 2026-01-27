import { test, expect } from '../../fixtures/article.fixture';
import { parseCommentFromApi, parseCommentsFromApi, type CommentId } from '../../types/comment';

test('API e2e - Post comment and get list of commnets', async ({
  request,
  article,
  foreignUser,
}) => {
  const authorUserName = article.author.username;
  const slug = article.slug;
  const commentBody = `Test comment ${Date.now()}`;

  let createdCommentId: CommentId;

  await test.step('POST /api/articles/:slug/comments', async () => {
    const response = await request.post(`/api/articles/${slug}/comments`, {
      headers: { Authorization: `Token ${foreignUser.token}` },
      data: {
        comment: {
          body: commentBody,
        },
      },
    });

    expect(response.status()).toBe(201);

    const { comment } = await response.json();
    const typedComment = parseCommentFromApi(comment);
    expect(typedComment.body).toBe(commentBody);
    expect(typedComment.author.username).not.toBe(authorUserName);

    createdCommentId = typedComment.id;
  });

  await test.step('GET /api/articles/:slug/comments', async () => {
    const response = await request.get(`api/articles/${slug}/comments`, {
      headers: { Authorization: `Token ${foreignUser.token}` },
    });

    expect(response.status()).toBe(200);
    const { comments } = await response.json();
    const typedComments = parseCommentsFromApi(comments);
    const createdComments = typedComments.find(comments => comments.id === createdCommentId);

    expect(createdComments).toBeDefined();
  });
});
