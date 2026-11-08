
import { api } from "../../../shared/api/apiClient";
import type { Category, ProvisionResponse, CreateProvisionRequest } from "../model/types";

export const provisionService = {
    getAll: () => api.get<ProvisionResponse[]>('/api/provisions').then((res) => res.data),
    getById: (id: number) => api.get<ProvisionResponse>(`/api/provisions/${id}`).then((res) => res.data),
    getTopProvisions: (profileId: number) => api.get<ProvisionResponse[]>(`/api/provisions/top-five/${profileId}`).then((res) => res.data),
    like: (id: number) => api.post(`/api/provisions/${id}/like`).then((res) => console.log(res)),
    provisionCreate: (newProvision: CreateProvisionRequest) => {

        const form = new FormData();

        form.append('title', newProvision.title);
        form.append('description', newProvision.description);
        form.append('categoryId', String(newProvision.categoryId));
        form.append('avatar', newProvision.avatar);
        form.append('slots', new Blob([JSON.stringify(newProvision.slots)], { type: 'application/json' }));
        newProvision.images.forEach((file) => form.append('images', file));

        return api.post<ProvisionResponse>('/api/provisions/create', form).then((res) => res.data)
    },
}

export const categoryService = {
    getAll: () => api.get<Category[]>('/api/provision-categories').then((res) => res.data),
}
