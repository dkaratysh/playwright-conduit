import { test, expect } from '@playwright/test';

test ('[API][SMOKE][Articles] GET /api.articles - should return list of public articles', async ({ request }) => {

    const response = await request.get('/api/articles');

    expect (response.status()).toBe(200);

    const body = await response.json();
    expect (Array.isArray(body.articles)).toBe(true);
    expect(typeof body.articlesCount).toBe('number');
});

