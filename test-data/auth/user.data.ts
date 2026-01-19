export const user = {
  username: process.env.USERNAME!,
  email: process.env.USER_EMAIL!,
  password: process.env.USER_PASS!,
};

export const userB = {
  email: process.env.USER_B_EMAIL!,
  password: process.env.USER_B_PASS!,
};

if (!user.username) {
  throw new Error('USER.username is not defined');
}
