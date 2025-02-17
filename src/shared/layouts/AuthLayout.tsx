import { Outlet } from 'react-router-dom';

export const AuthLayout = () => {
  return (
    <main className='flex h-screen w-full items-center justify-center'>
      <Outlet />
    </main>
  );
};
