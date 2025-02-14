import { createBrowserRouter, Navigate } from 'react-router-dom';

import { CalendarPage } from '../pages/calendar';
import { SignInPage } from '../pages/signin';
import { SignUpPage } from '../pages/signup';
import { TeamPage } from '../pages/team';
import { ROUTES } from '../shared/constants/routes';

interface AuthRouteProps {
  isPublic?: boolean;
}

export const AuthRoute = ({ isPublic }: AuthRouteProps) => {
  // todos : 스토어에서 엑세스 키 가져오기
  const isAuthenticated = null;
  if (!isPublic && !isAuthenticated) {
    return <Navigate to={ROUTES.AUTH.SIGN_IN} />;
  }
  if (isPublic && isAuthenticated) {
    return <Navigate to={ROUTES.ROOT} replace />;
  }
};

export const router = createBrowserRouter([
  {
    path: ROUTES.ROOT,
    element: <CalendarPage />, // 이제 여기에 layout이 들어가야 한다는거 맞지?
    children: [
      //  Public route
      {
        path: ROUTES.AUTH.SIGN_IN,
        element: <SignInPage />,
      },
      {
        path: ROUTES.AUTH.SIGN_UP,
        element: <SignUpPage />,
      },
      //   Private route
      {
        path: ROUTES.TEAM.root,
        element: <TeamPage />,
      },
      {
        path: ROUTES.TEAM.root,
        element: <TeamPage />,
      },
      {
        path: ROUTES.TEAM.root,
        element: <TeamPage />,
      },
    ],
  },
]);
