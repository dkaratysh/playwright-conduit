export interface User {
  email?: string;
  password?: string
  username?: string;
  token?: string;
  bio?: string;
  image?: string;
};

export type UpdateUserPayload = Partial<User>;

export type UserLoginPayload = Pick<User, "email" | "password">;
