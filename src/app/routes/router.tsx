import { createBrowserRouter } from 'react-router-dom';

import { CalendarDetail } from '@/features/calendar/ui/CalendarDetail';
import { CalendarPage } from '@/pages/calendar';
import { SignInPage } from '@/pages/signin';
import { SignUpPage } from '@/pages/signup';
import { TeamPage } from '@/pages/team';
import { ROUTES } from '@/shared/constants/routes';
import { AuthLayout } from '@/shared/layouts/AuthLayout';
import { MainLayout } from '@/shared/layouts/MainLayout';
import { SigninLayout } from '@/shared/layouts/SigninLayout';

import { AuthRoute } from './AuthRoutes';

export const router = createBrowserRouter([
  // Public Routes
  {
    element: (
      <AuthRoute isPublic>
        <AuthLayout />
      </AuthRoute>
    ),
    children: [
      {
        path: ROUTES.AUTH.SIGN_IN,
        element: (
          <SigninLayout>
            <SignInPage />
          </SigninLayout>
        ),
      },
      {
        path: ROUTES.AUTH.SIGN_UP,
        element: <SignUpPage />,
      },
    ],
  },
  // Private Routes
  {
    path: ROUTES.ROOT,
    element: (
      <AuthRoute>
        <MainLayout />
      </AuthRoute>
    ),
    children: [
      {
        path: ROUTES.TEAM.root,
        element: <TeamPage />,
      },
      {
        path: ROUTES.CALENDAR.root,
        element: <CalendarPage />,
      },
      {
        path: ROUTES.CALENDAR.DETAIL.ROOT,
        element: <CalendarDetail />,
      },
    ],
  },
]);
