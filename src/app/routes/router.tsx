import { createBrowserRouter, redirect } from 'react-router-dom';

import { AuthRoute } from '@/app/routes/AuthRoute';
import { EventDetails } from '@/features/calendar/ui/EventDetails';
import { CalendarPage } from '@/pages/calendar';
import { FindPassword } from '@/pages/findPW';
import { SignInPage } from '@/pages/signin';
import { SignUpPage } from '@/pages/signup';
import { TeamPage } from '@/pages/team';
import { ROUTES } from '@/shared/constants/routes';
import { AuthLayout } from '@/shared/layouts/AuthLayout';
import { MainLayout } from '@/shared/layouts/MainLayout';
import { SigninLayout } from '@/shared/layouts/SigninLayout';

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
      {
        path: ROUTES.AUTH.FIND_PW,
        element: <FindPassword />,
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
        index: true,
        loader: () => {
          return redirect(ROUTES.CALENDAR.root);
        },
      },
      {
        path: ROUTES.CALENDAR.root,
        element: <CalendarPage />,
      },
      {
        path: ROUTES.CALENDAR.NEW,
        element: <EventDetails />,
      },
      {
        path: ROUTES.CALENDAR.DETAIL.ROOT,
        element: <EventDetails />,
      },
      {
        path: ROUTES.TEAM.root,
        element: <TeamPage />,
      },
    ],
  },
]);
