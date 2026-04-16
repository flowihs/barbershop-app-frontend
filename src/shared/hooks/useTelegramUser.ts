import { useLaunchParams } from "@telegram-apps/sdk-react";

function useTelegramUser() {

    const tgWebAppData = useLaunchParams();
    const user = tgWebAppData.initData?.user;

    if (!user) return null

    return {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName ?? null,
        photoUrl: user.photoUrl ?? null,
        username: user.username ?? null
    };
}

export { useTelegramUser }