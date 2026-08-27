import { useQuery } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { accountService, useUserStore } from '@/entities/account';
import DefaultError from '@/shared/ui/DefaultError/DefaultError';
import DefaultLoading from '@/shared/ui/DefaultLoading/DefaultLoading';
import { ErrorHandlingMassage } from '@/shared/lib/api-error/apiErrorHandling';

function AuthProvider({ children }: { children: ReactNode }) {
  const { isPending, error } = useQuery({
    queryKey: ['account', 'session'],
    queryFn: async () => {
      const session = await accountService.getMe();

      useUserStore.getState().setSession(session);

      return session.user;
    },
    staleTime: Infinity,
  });

  if (isPending) {
    return (
      <div className="mx-auto w-full max-w-(--width-app) p-4">
        <DefaultLoading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto w-full max-w-(--width-app) p-4">
        <DefaultError text={ErrorHandlingMassage(error)} />
      </div>
    );
  }

  return children;
}

export default AuthProvider;
