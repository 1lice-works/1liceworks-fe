import { User } from 'lucide-react';

import { cn } from '@/shared/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/shadcn/Avatar';
import NotificationIcon from '@/widgets/gnb/ui/assets/bell.svg?react';
import TeamIcon from '@/widgets/gnb/ui/assets/document.svg?react';
import SearchIcon from '@/widgets/gnb/ui/assets/search.svg?react';

import { Logo } from './components/Logo';

const url = '';

export const CalendarGnb = () => {
  const isTeamLeader = true; // TODO) API 통해서 리더 여부 받아오기

  return (
    <nav className='flex w-full items-center justify-between gap-x-20 border-b px-8 py-4'>
      <Logo type='calendar' />

      <div className='bg-background-light flex flex-1 items-center gap-x-2 rounded-4xl border px-4 py-2'>
        <SearchIcon className='h-5 w-5' />
        <input
          className='placeholder:text-muted-foreground flex-1 text-sm focus:border-none focus:outline-none'
          placeholder='선택한 캘린더에서 일정을 검색하세요.'
        />
      </div>

      <div className='flex items-center gap-x-4'>
        {isTeamLeader && (
          <TeamIcon className='h-8 w-8 cursor-pointer transition duration-200 ease-in-out hover:scale-110 focus:scale-110' />
        )}
        <NotificationIcon className='h-8 w-8 cursor-pointer transition duration-200 ease-in-out hover:scale-110 focus:scale-110' />
        <Avatar className='h-8 w-8 cursor-pointer transition duration-200 ease-in-out hover:scale-110 focus:scale-110'>
          <AvatarImage src={url} alt={`user's avatar`} />
          <AvatarFallback className={cn('bg-background-light border')}>
            <User className='text-muted-foreground' />
          </AvatarFallback>
        </Avatar>
      </div>
    </nav>
  );
};
