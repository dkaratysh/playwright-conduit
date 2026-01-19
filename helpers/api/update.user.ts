import type { UpdateUserPayload } from '../../types/user';

export function buildUserUpdatePayload(
  user: UpdateUserPayload,
  overrides?: Partial<UpdateUserPayload>,
): UpdateUserPayload {
  const defaultPayload: UpdateUserPayload = {
    username: user.username,
    email: user.email,
    bio: 'Default bio',
    image: 'https://example.com/default-avatar.png',
    password: 'Upd123',
  };

  const payload = { ...defaultPayload, ...overrides };

  if (payload.password === '') {
    delete payload.password;
  }

  return payload;
}
