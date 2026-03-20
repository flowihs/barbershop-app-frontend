import { api } from "../../../shared/api/apiClient";
import type { TelegramProfile } from "../model/types";

async function getMe(): Promise<TelegramProfile>  {
    const response = await api.get<TelegramProfile>('/account/me');
    return response.data;
}

export { getMe };