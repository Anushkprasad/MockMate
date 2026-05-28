export const hasProfileAvatar = (avatarUrl?: string | null): boolean => {
  return typeof avatarUrl === 'string' && avatarUrl.trim().length > 0;
};
