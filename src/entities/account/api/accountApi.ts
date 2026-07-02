import { api } from "../../../shared/api/apiClient";
import type { TelegramAuthRequest } from "../../../shared/types/telegram-webapp";
import type { TelegramProfile } from "../model/types";

function getTelegramAuthRequest(): TelegramAuthRequest {
    const webApp = window.Telegram?.WebApp;
    const initData = webApp?.initData ?? "";
    const params = new URLSearchParams(initData);

    return {
        initData,
        authType: "mini_app",
        referralCode: webApp?.initDataUnsafe?.start_param ?? params.get("start_param") ?? "",
        languageCode: webApp?.initDataUnsafe?.user?.language_code ?? navigator.language,
    };
}

export const accountService = {
    getMe: () => api.post<TelegramProfile>("/api/auth", getTelegramAuthRequest()).then((e) => e.data),
}

