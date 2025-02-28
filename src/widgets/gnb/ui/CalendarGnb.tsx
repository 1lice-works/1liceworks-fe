import { cn } from '@/shared/lib/utils';
import { UserAvatar } from '@/shared/ui/custom/UserAvatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/ui/shadcn/DropdownMenu';
import NotificationIcon from '@/widgets/gnb/ui/assets/bell.svg?react';
import TeamIcon from '@/widgets/gnb/ui/assets/document.svg?react';

import { Logo } from './components/Logo';
import { SearchBar } from './components/SearchBar';

export const CalendarGnb = () => {
  const isTeamLeader = true; // TODO) API 통해서 리더 여부 받아오기

  const handleProfileClick = () => {
    // TODO) 프로필 모달 열기
    console.log('Profile clicked');
  };

  const handleLogoutClick = () => {
    // TODO) 로그아웃 처리
    console.log('Logout clicked');
  };

  return (
    <nav className='flex w-full items-center justify-between gap-x-20 border-b px-8 py-4'>
      <Logo type='calendar' />

      <SearchBar />

      <div className='flex items-center gap-x-4'>
        {isTeamLeader && (
          <TeamIcon className='h-8 w-8 cursor-pointer transition duration-200 ease-in-out hover:scale-110 focus:scale-110' />
        )}
        <NotificationIcon className='h-8 w-8 cursor-pointer transition duration-200 ease-in-out hover:scale-110 focus:scale-110' />
        <DropdownMenu>
          <DropdownMenuTrigger className={cn(`focus:outline-0`)}>
            <UserAvatar effect='hover' />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel className='flex items-center gap-x-2'>
              <UserAvatar />
              <div className='flex flex-col gap-y-1.5'>
                <p>양혜림</p>
                <p className='text-muted-foreground text-xs font-normal'>
                  관리직
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleProfileClick}>
              내 정보
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogoutClick}>
              로그아웃
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};
