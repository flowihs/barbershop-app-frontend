import styles from './AuthProvider.module.css';
import { useQuery } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import {
  accountQueryKeys,
  accountService,
  useUserStore,
} from '@/entities/account';
import DefaultError from '@/shared/ui/DefaultError/DefaultError';
import DefaultLoading from '@/shared/ui/DefaultLoading/DefaultLoading';
import { ErrorHandlingMassage } from '@/shared/lib/api-error/apiErrorHandling';

function AuthProvider({ children }: { children: ReactNode }) {
  const hasTelegramInitData = Boolean(window.Telegram?.WebApp?.initData);
  const isLocalDevelopment = import.meta.env.DEV && !hasTelegramInitData;

  const { isPending, error } = useQuery({
    queryKey: accountQueryKeys.session,
    queryFn: async () => {
      const session = await accountService.getMe();

      useUserStore.getState().setSession(session);

      return session.user;
    },
    enabled: !isLocalDevelopment,
    staleTime: Infinity,
  });

  if (isLocalDevelopment) {
    return children;
  }

  if (isPending) {
    return (
      <div className={styles.state}>
        <DefaultLoading />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.state}>
        <DefaultError text={ErrorHandlingMassage(error)} />
      </div>
    );
  }

  return children;
}

export default AuthProvider;
