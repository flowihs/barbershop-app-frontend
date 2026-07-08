import { api } from "../../../shared/api/apiClient";
// import { init, miniApp, initData, isTMA } from "@telegram-apps/sdk";
import { retrieveLaunchParams, retrieveRawInitData } from '@tma.js/sdk-react';
import type { TelegramProfile } from "../model/types";

export const accountService = {
  getMe: () => {

    let sign = retrieveLaunchParams().tgWebAppData?.signature ?? ""
    const initData = retrieveRawInitData() ?? "";
    console.log(initData);

    if (sign.slice(sign.length - 2, sign.length - 1) !== "==") {
      sign += ("==");
    }

    const params = new URLSearchParams(initData);
    params.set('signature', sign);
    console.log(sign);
    const newInitData = params.toString();

    console.log(newInitData);

    // Отправляем объект с полем initData (не JSON.stringify строки)
    return api.post<TelegramProfile>("/api/auth",
      { newInitData },
      { headers: { 'Content-Type': 'application/json' } }
    ).then(e => e.data);
  },
  getMeById: (id: number) => api.get<TelegramProfile>(`api/users/${id}`).then(e => e.data)
};

