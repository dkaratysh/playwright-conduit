import { test, expect } from '@playwright/test';

test('GET /api/tags returns list of public tags', async ({ request }) => {
  const response = await request.get('/api/tags');

  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(Array.isArray(body.tags)).toBe(true);
});
