import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  accountQueryKeys,
  accountService,
  type UserProfile,
  useUserStore,
} from '@/entities/account';

function readFileAsDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Failed to read avatar'));
      }
    };

    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

export function useUploadAvatar() {
  const user = useUserStore((state) => state.user);
  const updateUser = useUserStore((state) => state.updateUser);
  const queryClient = useQueryClient();

  const userId = user?.id;

  return useMutation({
    mutationFn: async (file: File) => {

      if (!userId) {
        throw new Error('User is not authenticated');
      }

      return accountService.updateAvatar({ id: userId, file });
    },
    onMutate: async (file) => {
      if (!userId) {
        throw new Error('User is not authenticated');
      }

      const queryKey = accountQueryKeys.profile(userId);
      const previousPhotoUrl = user?.photoUrl;

      const previousProfile = queryClient.getQueryData<UserProfile>(queryKey);
      const previewUrl = await readFileAsDataUrl(file);

      updateUser({ photoUrl: previewUrl });
      queryClient.setQueryData<UserProfile>(
        queryKey,
        (profile) => profile ? { ...profile, photoUrl: previewUrl } : profile,
      );

      return { previousPhotoUrl, previousProfile, userId };
    },
    onSuccess: ({ photoUrl }, _file, context) => {
      if (!context || !photoUrl) return;

      updateUser({ photoUrl: photoUrl });
      queryClient.setQueryData<UserProfile>(
        accountQueryKeys.profile(context.userId),
        (profile) => profile
          ? { ...profile, photoUrl: photoUrl }
          : profile,
      );
    },
    onError: (_error, _file, context) => {
      if (!context) return;

      updateUser({ photoUrl: context.previousPhotoUrl });
      queryClient.setQueryData(
        accountQueryKeys.profile(context.userId),
        context.previousProfile,
      );
    },
  });
}
