export {};

export interface TelegramAuthRequest {
    initData: string;
    authType: string;
    referralCode: string;
    languageCode: string;
}

declare global {
    interface WebAppUser {
        id: number;
        first_name: string;
        username?: string;
        language_code?: string;
    }

    interface WebAppInitDataUnsafe {
        user?: WebAppUser;
        start_param?: string;
    }

    interface TelegramWebApp {
        initData: string;
        initDataUnsafe?: WebAppInitDataUnsafe;
    }

    interface Window {
        Telegram?: {
            WebApp?: TelegramWebApp;
        };
    }
}

