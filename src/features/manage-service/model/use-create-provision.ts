import { useMutation, useQueryClient } from '@tanstack/react-query';
import { provisionQueryKeys } from '@/entities/provision/api/provisionQueryKeys';
import { provisionService } from '@/entities/provision/api/provisionApi';
import type { CreateProvisionRequest, ProvisionResponse } from '@/entities/provision/model/types';
import { useUserStore } from '@/entities/account/store/userStore';

export function useCreateProvision() {
  const userId = useUserStore((state) => state.user?.id);
  const queryClient = useQueryClient();

  return useMutation({
    retry: false,
    mutationFn: async (newProvision: CreateProvisionRequest) => {
      if (!userId) throw new Error('Откройте приложение из Telegram, чтобы создать услугу.');
      return provisionService.provisionCreate(newProvision);
    },
    onSuccess: async (newProvision: ProvisionResponse) => {
      if (userId) {
        queryClient.setQueryData<ProvisionResponse[]>(
          provisionQueryKeys.barberProvisions(userId),
          (previous = []) => [newProvision, ...previous.filter((entry) => entry.id !== newProvision.id)],
        );
        await queryClient.invalidateQueries({ queryKey: provisionQueryKeys.topFive(userId), exact: true });
      }
      await queryClient.invalidateQueries({ queryKey: ['provisions'], exact: true });
    },
  });
}
