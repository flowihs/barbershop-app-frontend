import { api } from "../../../shared/api/apiClient";
import type { Provision } from "../model/types";

export const provisionService = {
    getAll: async () => {
        const res = await api.get<Provision[]>('/provisions/all');
        return res.data;
    }, 
    getById: async (id: number) => {
        const res = await api.get<Provision>(`/provisions/${id}`);
        return res.data; 
    },
    getFreeSlots: async (id: number) => {
        const res = await api.get<Provision>(`/provisions/free/${id}`);
        return res.data;
    }
}