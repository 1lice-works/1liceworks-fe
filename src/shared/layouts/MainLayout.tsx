import { Outlet } from 'react-router-dom';

import { Gnb } from '@/widgets/gnb/ui/Gnb';
import { Lnb } from '@/widgets/lnb/ui/Lnb';
import { ModalManager } from '@/widgets/modal/ui/ModalManager';

export const MainLayout = () => {
  return (
    <div className='flex h-screen w-full flex-col'>
      <Gnb />

      <div className='flex flex-1'>
        <Lnb />

        <main className='h-full flex-1 p-4'>
          <Outlet />
        </main>
      </div>

      <ModalManager />
    </div>
  );
};
