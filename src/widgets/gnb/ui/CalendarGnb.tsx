import { UserAvatar } from '@/shared/ui/custom/UserAvatar';
import NotificationIcon from '@/widgets/gnb/ui/assets/bell.svg?react';
import TeamIcon from '@/widgets/gnb/ui/assets/document.svg?react';
import SearchIcon from '@/widgets/gnb/ui/assets/search.svg?react';

import { Logo } from './components/Logo';

export const CalendarGnb = () => {
  const isTeamLeader = true; // TODO) API 통해서 리더 여부 받아오기

  return (
    <nav className='flex w-full items-center justify-between gap-x-20 border-b px-8 py-4'>
      <Logo type='calendar' />

      <div className='bg-background-light flex flex-1 items-center gap-x-2 rounded-4xl border px-4 py-2'>
        <SearchIcon className='h-5 w-5' />
        <input
          className='flex-1 text-sm focus:border-none focus:outline-none'
          placeholder='선택한 캘린더에서 일정을 검색하세요.'
        />
      </div>

      <div className='flex items-center gap-x-4'>
        {isTeamLeader && (
          <TeamIcon className='h-8 w-8 cursor-pointer transition duration-200 ease-in-out hover:scale-110 focus:scale-110' />
        )}
        <NotificationIcon className='h-8 w-8 cursor-pointer transition duration-200 ease-in-out hover:scale-110 focus:scale-110' />
        <UserAvatar effect='hover' />
      </div>
    </nav>
  );
};
