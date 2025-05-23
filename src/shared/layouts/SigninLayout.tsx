import { ReactNode } from 'react';

import CalendarIcon from '@/widgets/gnb/ui/assets/calendar.svg?react';

interface SigninLayoutProps {
  children: ReactNode;
}

export const SigninLayout = ({ children }: SigninLayoutProps) => {
  return (
    <div className='flex h-full w-full'>
      <section className='bg-background-dark flex w-1/2 p-4'>
        <div className='flex items-center gap-x-2 place-self-start'>
          <CalendarIcon className='h-10 w-10' />
          <p className='text-lg font-semibold text-white'>일리스웍스</p>
        </div>
      </section>

      <section className='flex w-1/2 items-center justify-center p-4'>
        {children}
      </section>
    </div>
  );
};
