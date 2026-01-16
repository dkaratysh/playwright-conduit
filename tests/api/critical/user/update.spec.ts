import { test, expect } from '@playwright/test';
import { buildUserUpdatePayload } from '../../../../helpers/api/update.user';
import { createTempUser } from '../../../../helpers/api/temp.user';

test('PUT api/user updates user profile', async ({ request }) => {
  const tempUser = await createTempUser(request);
  const payload = buildUserUpdatePayload(tempUser, {
    bio: 'Updated bio via API',
    image: 'https://example.com/avatar.png',
  });

  const response = await request.put('/api/user', {
    data: { user: payload },
    headers: { Authorization: `Token ${tempUser.token}` },
  });

  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body.user).toHaveProperty('bio', payload.bio);
  expect(body.user).toHaveProperty('image', payload.image);
  expect(body.user).toHaveProperty('username', payload.username);
  expect(body.user).toHaveProperty('email', payload.email);
});
