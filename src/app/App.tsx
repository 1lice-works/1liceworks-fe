import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export const App = () => (
  <QueryClientProvider client={queryClient}>
    {/* 라우터 또는 페이지 컴포넌트가 렌더링될 자리 */}
    <>App</>

    {/* 개발 환경에서만 React Query Devtools 활성화 */}
    {import.meta.env.MODE === 'development' && (
      <ReactQueryDevtools initialIsOpen={false} />
    )}
  </QueryClientProvider>
);
