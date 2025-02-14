import { RouterProvider } from 'react-router-dom';

import { QueryProvider } from './providers/QueryProvider';
import { router } from './Router';

export const App = () => (
  <QueryProvider>
    <RouterProvider router={router} />
  </QueryProvider>
);
