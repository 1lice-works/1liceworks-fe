import { createBrowserRouter } from 'react-router-dom';

import { CalendarPage } from '../../pages/calendar';
import { SignInPage } from '../../pages/signin';
import { SignUpPage } from '../../pages/signup';
import { TeamPage } from '../../pages/team';
import { ROUTES } from '../../shared/constants/routes';
import { AuthRoute } from './AuthRoutes';

export const router = createBrowserRouter([
  {
    path: ROUTES.ROOT,
    element: <SignInPage />, // 이제 여기에 layout이 들어가야 한다는거 맞지?
    children: [
      // Public Routes
      {
        path: ROUTES.AUTH.SIGN_IN,
        element: (
          <AuthRoute isPublic>
            <SignInPage />
          </AuthRoute>
        ),
      },
      {
        path: ROUTES.AUTH.SIGN_UP,
        element: (
          <AuthRoute isPublic>
            <SignUpPage />
          </AuthRoute>
        ),
      },
      // Private Routes
      {
        path: ROUTES.TEAM.root,
        element: (
          <AuthRoute>
            <TeamPage />
          </AuthRoute>
        ),
      },
      {
        path: ROUTES.CALENDAR.root,
        element: (
          <AuthRoute>
            <CalendarPage />
          </AuthRoute>
        ),
      },
    ],
  },
]);
