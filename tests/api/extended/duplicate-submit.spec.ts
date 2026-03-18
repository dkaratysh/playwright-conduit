import { test, expect } from '../../../fixtures/auth.fixture';
import { createArticleRaw } from '../../../helpers/api/articleRaw';

test('Should not allow to submit the same article twice', async ({ request, authToken }) => {
  const overrides = {
    title: `dup-${Date.now()}`,
  };

  const [res1, res2] = await Promise.all([
    createArticleRaw(request, { token: authToken, overrides }),
    createArticleRaw(request, { token: authToken, overrides }),
  ]);

  const statuses = [res1.response.status(), res2.response.status()];

  expect(statuses).toContain(201);
  expect(statuses.filter(s => s === 201).length).toBe(1);
});
