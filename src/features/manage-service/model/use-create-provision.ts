
import { provisionQueryKeys } from '@/entities/provision/api/provisionQueryKeys';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { CreateProvisionRequest } from '@/entities/provision/model/types';
import { provisionService } from '@/entities/provision/api/provisionApi';
import type { Provision } from '@/entities/provision/model/types';
import { useUserStore } from '@/entities/account/store/userStore';

export function useCreateProvision() {

    const id = useUserStore((state) => state.user?.id);
    if (!id) {
        throw new Error('User ID is not available. Please ensure the user is logged in.');
    }
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (newProvision: CreateProvisionRequest) => {
            return provisionService.provisionCreate(newProvision);
        },
        onSuccess: (newProvision: Provision) => {
            queryClient.setQueryData<Provision[]>(
                provisionQueryKeys.barberProvisions(id),
                (oldData) => oldData ? [...oldData, newProvision] : oldData
            )
        },
    })
}  