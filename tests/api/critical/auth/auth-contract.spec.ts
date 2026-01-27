import { test, expect } from '../../../../fixtures/auth.fixture';

test('login token works on protected endpoint', async ({ request, authToken, authUser }) => {
  expect(authToken).toBeTruthy();

  const response = await request.get('/api/user', {
    headers: { Authorization: `Token ${authToken}` },
  });

  expect(response.status()).toBe(200);

  const { user } = await response.json();
  expect(user.email).toBe(authUser.email);
});
