
import { api, authApi } from "../../../shared/api/apiClient";
import type { TelegramAuthResponse, TelegramProfile, UserProfile, Socials } from "../model/types";

export const accountService = {
  getMe: () => {

    const data = window.Telegram?.WebApp?.initData;

    return authApi.post<TelegramAuthResponse>("/api/auth/telegram",
      { initData: data },
      { headers: { 'Content-Type': 'application/json' } }
    ).then(e => e.data)
  },
  getProfileById: (id?: number) => api.get<UserProfile>(`/api/account/profile/${id}`).then(e => e.data),
  getMeById: (id: number) => api.get<TelegramProfile>(`/api/users/${id}`).then(e => e.data),
  updateDescription: (descriptionChange: Pick<TelegramProfile, 'description' | 'id'>) => api.post('/api/account/update-description', descriptionChange).then(e => e.data),
  updateSocials: (socialsChange: { id: number } & Socials) => api.post('/api/account/update-social-netoworks', socialsChange).then(e => e.data),
  updateAvatar: (avatarChange: {
    id: number,
    file: File
  }) => {
    const formData = new FormData();

    formData.append('id', String(avatarChange.id));
    formData.append('file', avatarChange.file);

    return api.post('/api/account/update-avatar', formData).then(e => e.data);
  }
};

