import { Avatar } from '@/shared/ui/shadcn/Avatar';
import NotificationIcon from '@/widgets/gnb/ui/assets/bell.svg?react';
import CalendarIcon from '@/widgets/gnb/ui/assets/calendar.svg?react';
import TeamIcon from '@/widgets/gnb/ui/assets/document.svg?react';
import SearchIcon from '@/widgets/gnb/ui/assets/search.svg?react';

export const CalendarGnb = () => {
  const isTeamLeader = true; // TODO) API 통해서 리더 여부 받아오기

  return (
    <nav className='flex w-full items-center justify-between gap-x-20 border-b px-10 py-4'>
      <div className='flex items-center gap-x-4'>
        <CalendarIcon className='h-10 w-10' />
        <p className='text-xl'>Calendar</p>
      </div>

      <div className='bg-background-light flex flex-1 items-center gap-x-2 rounded-4xl border px-4 py-2 text-sm'>
        <SearchIcon />
        <input
          className='placeholder:text-muted-foreground flex-1 focus:border-none focus:outline-none'
          placeholder='선택한 캘린더에서 일정을 검색하세요.'
        />
      </div>

      <div className='flex items-center gap-x-4'>
        {isTeamLeader && (
          <TeamIcon className='h-10 w-10 cursor-pointer transition duration-200 ease-in-out hover:scale-110 focus:scale-110' />
        )}
        <NotificationIcon className='h-10 w-10 cursor-pointer transition duration-200 ease-in-out hover:scale-110 focus:scale-110' />
        <Avatar className='cursor-pointer' />
      </div>
    </nav>
  );
};
