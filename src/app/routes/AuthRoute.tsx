import { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';

import { ROUTES } from '@/shared/constants/routes';
import { useAuthStore } from '@/shared/model/useAuthStore';

interface AuthRouteProps extends PropsWithChildren {
  isPublic?: boolean;
}

export const AuthRoute = ({ isPublic, children }: AuthRouteProps) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isPublic && !isAuthenticated) {
    return <Navigate to={ROUTES.AUTH.SIGN_IN} replace />;
  }

  if (isPublic && isAuthenticated) {
    return <Navigate to={ROUTES.ROOT} replace />;
  }

  return <>{children}</>;
};
