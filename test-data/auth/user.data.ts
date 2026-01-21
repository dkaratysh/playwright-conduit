export const user = {
  username: process.env.USERNAME!,
  email: process.env.USER_EMAIL!,
  password: process.env.USER_PASS!,
};

export const userB = {
  username: process.env.USERNAME_B!,
  email: process.env.USER_B_EMAIL!,
  password: process.env.USER_B_PASS!,
};

if (!user.username) {
  throw new Error('USER.username is not defined');
}
