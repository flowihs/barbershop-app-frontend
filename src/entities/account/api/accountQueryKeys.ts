
export const accountQueryKeys = {
  session: ['account', 'session'] as const,
  profile: (userId?: number) => ['userProfile', userId] as const,
};
