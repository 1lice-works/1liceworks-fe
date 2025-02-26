import { Outlet } from 'react-router-dom';

import { Gnb } from '@/widgets/gnb/ui/Gnb';
import { ModalManager } from '@/widgets/modal/ui/ModalManager';

export const MainLayout = () => {
  return (
    <div className='flex h-screen w-full flex-col'>
      <Gnb />

      <div className='flex flex-1'>
        {/* LNB 위치 (아래 코드는 수정 예정) */}
        <div className='bg-background-light h-full p-4'>LNB</div>

        <main className='h-full flex-1 p-4'>
          <Outlet />
        </main>
      </div>

      <ModalManager />
    </div>
  );
};
