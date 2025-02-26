import { Avatar } from '@/shared/ui/shadcn/Avatar';
import NotificationIcon from '@/widgets/gnb/ui/assets/bell.svg?react';
import CalendarIcon from '@/widgets/gnb/ui/assets/calendar.svg?react';
import TeamPageIcon from '@/widgets/gnb/ui/assets/document.svg?react';

export const TeamGnb = () => {
  return (
    <nav className='bg-background-dark flex w-full items-center justify-between gap-x-20 border-b px-10 py-4'>
      <div className='flex items-center gap-x-4'>
        <TeamPageIcon className='focus: h-10 w-10' />
        <p className='text-xl text-white'>Team</p>
      </div>

      <div className='flex items-center gap-x-4'>
        <CalendarIcon className='h-10 w-10 cursor-pointer transition duration-200 ease-in-out hover:scale-110 focus:scale-110' />
        <NotificationIcon className='h-10 w-10 cursor-pointer transition duration-200 ease-in-out hover:scale-110 focus:scale-110' />
        <Avatar className='cursor-pointer' />
      </div>
    </nav>
  );
};
