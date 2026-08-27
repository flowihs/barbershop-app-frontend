import { create } from 'zustand';
import type { TelegramAuthResponse, TelegramProfile } from '../model/types';

interface UserStore {
  user: TelegramProfile | null;
  token: string | null;
  setSession: (session: TelegramAuthResponse) => void;
  updateUser: (user: Partial<TelegramProfile>) => void;
  clearSession: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  token: null,
  setSession: ({ user, token }) => set({ user, token }),
  updateUser: (user) =>
    set((state) => ({
      user: state.user ? { ...state.user, ...user } : null,
    })),
  clearSession: () => set({ user: null, token: null }),
}));
