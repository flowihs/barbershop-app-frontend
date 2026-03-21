import { api } from "../../../shared/api/apiClient";
import type { TelegramProfile } from "../model/types";

export const accountService = {
    getMe: async () => { 
        const res = await api.get<TelegramProfile>('/account/me');
        return res.data;
    },
}

