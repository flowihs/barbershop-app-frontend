import { create } from 'zustand';
import type { TelegramAuthResponse, TelegramProfile } from '../model/types';

interface UserStore {
  user: TelegramProfile | null;
  token: string | null;
  setSession: (session: TelegramAuthResponse) => void;
  updateUser: (user: Partial<TelegramProfile>) => void;
  clearSession: () => void;
}

function removeSocials(user: TelegramProfile) {
  const sessionUser = { ...user } as TelegramProfile & { socials?: unknown };

  delete sessionUser.socials;

  return sessionUser;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  token: null,
  setSession: ({ user, token }) => set({ user: removeSocials(user), token }),
  updateUser: (user) =>
    set((state) => ({
      user: state.user ? { ...state.user, ...user } : null,
    })),
  clearSession: () => set({ user: null, token: null }),
}));
