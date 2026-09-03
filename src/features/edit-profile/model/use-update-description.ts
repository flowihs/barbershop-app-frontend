import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  accountQueryKeys,
  accountService,
  type UserProfile,
  useUserStore,
} from '@/entities/account';

export function useUpdateDescription() {

  const userId = useUserStore((state) => state.user?.id);
  const updateUser = useUserStore((state) => state.updateUser);

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (description: string) => {
      if (!userId) {
        throw new Error('User is not authorized');
      }

      await accountService.updateDescription({
        id: userId,
        description,
      });

      return { userId, description };
    },
    onSuccess: ({ userId, description }) => {
      updateUser({ description });

      queryClient.setQueryData<UserProfile>(
        accountQueryKeys.profile(userId),
        (profile) => profile ? { ...profile, description } : profile
      );
    },
  });
}
