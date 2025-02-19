import { PropsWithChildren } from 'react';

interface AuthRouteProps extends PropsWithChildren {
  isPublic?: boolean;
}

export const AuthRoute = ({ isPublic, children }: AuthRouteProps) => {
  // todos : 스토어에서 엑세스 키 가져오기
  // const isAuthenticated = true;

  // if (!isPublic && !isAuthenticated) {
  //   return <Navigate to={ROUTES.AUTH.SIGN_IN} replace />;
  // }

  // if (isPublic && isAuthenticated) {
  //   return <Navigate to={ROUTES.ROOT} replace />;
  // }

  return <>{children}</>;
};
