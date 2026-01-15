import type {TempUser} from '../../helpers/api/temp.user.helper'

export type UserUpdatePayload = {
  username?: string;
  email?: string;
  bio?: string;
  image?: string;
  password?: string;
};

export function buildUserUpdatePayload(
  user: TempUser,
  overrides?: Partial<UserUpdatePayload>
): UserUpdatePayload {
  const defaultPayload: UserUpdatePayload = {
    username: user.username,
    email:    user.email,
    bio:      'Default bio',
    image:    'https://example.com/default-avatar.png',
    password: 'Upd123'
  };

  const payload = { ...defaultPayload, ...overrides };

  if (payload.password === '') {
    delete payload.password;
  }

  return payload;
}
