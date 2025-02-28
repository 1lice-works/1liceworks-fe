import { Link, useLocation } from 'react-router-dom';

import { ROUTES } from '@/shared/constants/routes';
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
import CalendarIcon from '@/widgets/gnb/ui/assets/calendar.svg?react';
import TeamIcon from '@/widgets/gnb/ui/assets/document.svg?react';

import { Logo } from './components/Logo';
import { SearchBar } from './components/SearchBar';

type GnbType = 'calendar' | 'team';

const ICON_CLASS_NAME =
  'h-8 w-8 cursor-pointer transition duration-200 ease-in-out hover:scale-110 focus:scale-110';

export const Gnb = () => {
  const location = useLocation();
  const path = location.pathname;

  // 경로 기반으로 GnbType 결정
  const gnbType: GnbType = path.startsWith('/team') ? 'team' : 'calendar';

  // TODO) API 연동 후 role 받아오기
  const isLeader = true;

  const handleProfileClick = () => {
    // TODO) 프로필 모달 열기
    console.log('Profile clicked');
  };

  const handleLogoutClick = () => {
    // TODO) 로그아웃 처리
    console.log('Logout clicked');
  };

  return (
    <nav
      className={cn(
        'flex w-full items-center justify-between gap-x-20 border-b px-8 py-4',
        { 'bg-background-dark': gnbType === 'team' }
      )}
    >
      <Logo type={gnbType} />

      {gnbType === 'calendar' && <SearchBar />}

      <div className='flex items-center gap-x-4'>
        {gnbType === 'calendar' && isLeader && (
          <Link to={ROUTES.TEAM.root}>
            <TeamIcon className='h-8 w-8 cursor-pointer transition duration-200 ease-in-out hover:scale-110 focus:scale-110' />
          </Link>
        )}
        {gnbType === 'team' && (
          <Link to={ROUTES.CALENDAR.root}>
            <CalendarIcon className={ICON_CLASS_NAME} />
          </Link>
        )}

        {/* TODO) onClick 핸들러 추가 */}
        <NotificationIcon className={ICON_CLASS_NAME} />

        <DropdownMenu>
          <DropdownMenuTrigger className={cn(`focus:outline-0`)}>
            <UserAvatar className={ICON_CLASS_NAME} />
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
