import { test, expect } from '../../fixtures/article.fixture';
import type { CreateCommentResponse, GetCommentsResponse } from '../../types/comment';

test('API e2e - Post comment and get list of commnets', async ({
  request,
  article,
  foreignUser,
}) => {
  const authorUserName = article.author.username;
  const slug = article.slug;
  const commentBody = `Test comment ${Date.now()}`;

  let createdCommentId: number;

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

    const { comment } = (await response.json()) as CreateCommentResponse;
    expect(comment.body).toBe(commentBody);
    expect(comment.author.username).not.toBe(authorUserName);

    createdCommentId = comment.id;
  });

  await test.step('GET /api/articles/:slug/comments', async () => {
    const response = await request.get(`api/articles/${slug}/comments`, {
      headers: { Authorization: `Token ${foreignUser.token}` },
    });

    expect(response.status()).toBe(200);
    const { comments } = (await response.json()) as GetCommentsResponse;
    const createdComments = comments.find(comments => comments.id === createdCommentId);
    expect(createdComments).toBeDefined();
  });
});
