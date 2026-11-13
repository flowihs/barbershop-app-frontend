
import { api } from "../../../shared/api/apiClient";
import type { Category, ProvisionResponse, CreateProvisionRequest } from "../model/types";
import { mockApi, useApiMocks } from '@/shared/api/mockApi';

export const provisionService = {
    getAll: () => useApiMocks ? Promise.resolve(mockApi.provisions()) : api.get<ProvisionResponse[]>('/api/provisions').then((res) => res.data),
    getById: (id: number) => useApiMocks ? Promise.resolve(mockApi.provision(id)) : api.get<ProvisionResponse>(`/api/provisions/${id}`).then((res) => res.data),
    getTopProvisions: (profileId: number) => useApiMocks ? Promise.resolve(mockApi.topProvisions()) : api.get<ProvisionResponse[]>(`/api/provisions/top-five/${profileId}`).then((res) => res.data),
    like: (id: number) => useApiMocks ? Promise.resolve(mockApi.toggleLike(id)) : api.post(`/api/provisions/${id}/like`).then((res) => res.data),
    provisionCreate: (newProvision: CreateProvisionRequest) => {

        const form = new FormData();

        form.append('title', newProvision.title);
        form.append('description', newProvision.description);
        form.append('categoryId', String(newProvision.categoryId));
        form.append('avatar', newProvision.avatar);
        form.append('slots', new Blob([JSON.stringify(newProvision.slots)], { type: 'application/json' }));
        newProvision.images.forEach((file) => form.append('images', file));

        return useApiMocks
            ? Promise.resolve(mockApi.createProvision(newProvision))
            : api.post<ProvisionResponse>('/api/provisions/create', form).then((res) => res.data)
    },
}

export const categoryService = {
    getAll: () => useApiMocks ? Promise.resolve(mockApi.categories()) : api.get<Category[]>('/api/provision-categories').then((res) => res.data),
}
