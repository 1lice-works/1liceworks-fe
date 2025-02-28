import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';

import { cn } from '@/shared/lib/utils';
import { UserAvatar } from '@/shared/ui/custom/UserAvatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/shared/ui/shadcn/DropdownMenu';
import NotificationIcon from '@/widgets/gnb/ui/assets/bell.svg?react';
import CalendarIcon from '@/widgets/gnb/ui/assets/calendar.svg?react';

import { Logo } from './components/Logo';

export const TeamGnb = () => {
  const handleProfileClick = () => {
    // TODO) 프로필 모달 열기
    console.log('Profile clicked');
  };

  const handleLogoutClick = () => {
    // TODO) 로그아웃 처리
    console.log('Logout clicked');
  };

  return (
    <nav className='bg-background-dark flex w-full items-center justify-between gap-x-20 border-b px-8 py-4'>
      <Logo type='team' />

      {/* TODO) Avatar, 드롭다운 내용 사용자 실제 정보로 변경 */}
      <div className='flex items-center gap-x-4'>
        <CalendarIcon className='h-8 w-8 cursor-pointer transition duration-200 ease-in-out hover:scale-110 focus:scale-110' />
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
