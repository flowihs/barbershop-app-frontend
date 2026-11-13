
import { api, authApi } from "../../../shared/api/apiClient";
import type { TelegramAuthResponse, UserProfile } from "../model/types";
import { mockApi, useApiMocks } from '@/shared/api/mockApi';

export const accountService = {
  getMe: () => {
    if (useApiMocks) return Promise.resolve(mockApi.auth());

    const webApp = window.Telegram?.WebApp;
    webApp?.ready();
    const data = webApp?.initData;

    if (!data) {
      return Promise.reject(new Error('Telegram initData is missing. Open the app from Telegram.'));
    }

    return authApi.post<TelegramAuthResponse>("/api/auth/telegram",
      { initData: data },
      { headers: { 'Content-Type': 'application/json' } }
    ).then(e => e.data)
  },
  getProfileById: (id?: number) => useApiMocks ? Promise.resolve(mockApi.profile(id)) : api.get<UserProfile>(`/api/account/profile/${id}`).then(e => e.data),
  getMeById: (id: number) => useApiMocks ? Promise.resolve(mockApi.profile(id)) : api.get<UserProfile>(`/api/account/profile/${id}`).then(e => e.data),
  updateDescription: (changes: Pick<UserProfile, 'description' | 'id'>) => useApiMocks
    ? Promise.resolve(mockApi.updateProfile({ description: changes.description }))
    : api.post('/api/account/update-description', changes).then(e => e.data),
  updateSocials: (changes: Pick<UserProfile, 'tiktok' | 'id' | 'instagram' | 'number'>) => useApiMocks
    ? Promise.resolve(mockApi.updateProfile(changes))
    : api.post('/api/account/update-social-netoworks', changes).then(e => e.data),
  updateAvatar: (avatarChange: {
    id: number,
    file: File
  }) => {
    const formData = new FormData();

    formData.append('id', String(avatarChange.id));
    formData.append('photo', avatarChange.file); 

    return useApiMocks
      ? Promise.resolve(mockApi.updateProfile({ photoUrl: URL.createObjectURL(avatarChange.file) }))
      : api.post('/api/account/update-avatar', formData).then(e => e.data);
  }
};

