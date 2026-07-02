import axios from "axios";

function getTelegramInitData(): string {
    return window.Telegram?.WebApp?.initData ?? "";
}

const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 5000,
});

api.interceptors.request.use((config) => {
    const initData = getTelegramInitData();

    if (initData) {
        config.headers.Authorization = `tma ${initData}`;
    }

    return config;
});

export { api };
