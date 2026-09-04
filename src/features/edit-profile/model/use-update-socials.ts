import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  accountQueryKeys,
  accountService,
  type Socials,
  type UserProfile,
  useUserStore,
} from '@/entities/account';

export function useUpdateSocials() {
  const userId = useUserStore((state) => state.user?.id);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (socials: Socials) => {
      if (!userId) {
        throw new Error('User is not authorized');
      }

      await accountService.updateSocials({ id: userId, ...socials });

      return { userId, socials };
    },
    onSuccess: ({ userId, socials }) => {
      queryClient.setQueryData<UserProfile>(
        accountQueryKeys.profile(userId),
        (profile) => profile ? { ...profile, socials } : profile,
      );
    },
  });
}
