import { Outlet } from 'react-router-dom';

export const MainLayout = () => {
  return (
    <div className='h-screen w-full'>
      {/* GNB 위치 (아래 코드는 수정 예정) */}
      <div className='bg-background-dark w-full text-white'>GNB</div>
      <div className='flex h-full w-full'>
        {/* LNB 위치 (아래 코드는 수정 예정) */}
        <div className='bg-background-light'>LNB</div>

        <main className='flex-1'>
          <Outlet />
        </main>
      </div>
    </div>
  );
};
