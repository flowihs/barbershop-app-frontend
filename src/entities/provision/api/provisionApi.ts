import { api } from "../../../shared/api/apiClient";
import type {Category, Provision} from "../model/types";

export const provisionService = {
    getAll: () => api.get<Provision[]>('/provisions/all').then((res) => res.data),
    getById: (id: number) => api.get<Provision>(`/provisions/${id}`).then((res) => res.data), 
    getFreeSlots: async (id: number) => api.get<Provision>(`/provisions/free/${id}`).then((res) => res.data)
}

export const categoryService = {
    getAll: () => api.get<Category[]>('/category/all').then((res) => res.data)
}   