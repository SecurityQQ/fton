// utils/serializeUser.ts

interface User {
  telegramId: bigint;
  [key: string]: any;
}

export function serializeUser(user: User) {
  return {
    ...user,
    telegramId: user.telegramId.toString(), // Convert BigInt to string
  };
}
