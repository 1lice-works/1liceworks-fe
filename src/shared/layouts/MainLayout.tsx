import { Outlet } from 'react-router-dom';

export const MainLayout = () => {
  return (
    <div className='flex h-screen w-full flex-col'>
      {/* GNB 위치 (아래 코드는 수정 예정) */}
      <div className='bg-background-dark w-full px-10 py-4 text-white'>GNB</div>

      <div className='flex flex-1'>
        {/* LNB 위치 (아래 코드는 수정 예정) */}
        <div className='bg-background-light h-full p-4'>LNB</div>

        <main className='h-full flex-1 p-4'>
          <Outlet />
        </main>
      </div>
    </div>
  );
};
