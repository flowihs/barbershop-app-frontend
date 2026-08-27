import { useUserStore } from '@/entities/account';
import { api } from '@/shared/api/apiClient';

let isConfigured = false;

export function setupApiInterceptors() {
  if (isConfigured) return;

  api.interceptors.request.use((config) => {
    const token = useUserStore.getState().token;

    if (token) {
      config.headers.set('Authorization', `Bearer ${token}`);
    }

    return config;
  });

  isConfigured = true;
}
