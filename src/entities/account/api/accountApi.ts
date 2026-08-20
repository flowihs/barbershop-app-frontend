import { api } from "../../../shared/api/apiClient";
// import { init, miniApp, initData, isTMA } from "@telegram-apps/sdk";
// import { retrieveLaunchParams, retrieveRawInitData } from '@tma.js/sdk-react';
import type { TelegramProfile } from "../model/types";

export const accountService = {
  getMe: () => {

    const data = window.Telegram?.WebApp?.initData;

    return api.post<TelegramProfile>("/api/auth/telegram",
      { initData: data },
      { headers: { 'Content-Type': 'application/json' } }
    ).then(e => {
      console.log(e.data);
      return e.data;
    })
  },
  getMeById: (id: number) => api.get<TelegramProfile>(`api/users/${id}`).then(e => e.data)
};

