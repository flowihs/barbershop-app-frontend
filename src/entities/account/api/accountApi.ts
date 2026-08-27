import { api, authApi } from "../../../shared/api/apiClient";
import type { TelegramAuthResponse, TelegramProfile } from "../model/types";

export const accountService = {
  getMe: () => {

    const data = window.Telegram?.WebApp?.initData;

    return authApi.post<TelegramAuthResponse>("/api/auth/telegram",
      { initData: data },
      { headers: { 'Content-Type': 'application/json' } }
    ).then(e => e.data)
  },
  getMeById: (id: number) => api.get<TelegramProfile>(`api/users/${id}`).then(e => e.data)
};

