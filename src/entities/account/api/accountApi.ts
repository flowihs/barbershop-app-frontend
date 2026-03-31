import { api } from "../../../shared/api/apiClient";
import type { TelegramProfile } from "../model/types";

export const accountService = {
    getMe: () => api.get<TelegramProfile>('/account/me').then(e => e.data),
}

