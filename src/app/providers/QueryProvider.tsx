import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactNode } from 'react';

import { queryClient } from '../../shared/api/queryClient';

interface QueryProviderProps {
  children: ReactNode;
}

export const QueryProvider = ({ children }: QueryProviderProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}

      {/* 개발 환경에서만 React Query Devtools 활성화 */}
      {import.meta.env.MODE === 'development' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
};
