import { api } from "../../../shared/api/apiClient";
import type { TelegramProfile } from "../model/types";

// export const accountService = {
//     getMe: async () => { 
//         const res = await api.get<TelegramProfile>('/account/me');
//         return res.data;
//     },
// }

export const accountService = {
    getMe: () => api.get<TelegramProfile>('/account/me').then(e => e.data),
    // описываешь так же далее, никаких асинк авейт
}

