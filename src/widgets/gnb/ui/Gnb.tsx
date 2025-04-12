import { useMutation, useQuery } from '@tanstack/react-query';
import { Link, useLocation } from 'react-router-dom';

import { MinimalUserProfileDTO } from '@/entities/user/api/dto';
import { userQueries } from '@/entities/user/api/queries';
import { authQueries } from '@/features/auth/api/queries';
import { SearchBar } from '@/features/calendar/ui/SearchBar';
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
import { GnbType } from '@/widgets/gnb/model/types';
import NotificationIcon from '@/widgets/gnb/ui/assets/bell.svg?react';
import CalendarIcon from '@/widgets/gnb/ui/assets/calendar.svg?react';
import TeamIcon from '@/widgets/gnb/ui/assets/document.svg?react';
import { Logo } from '@/widgets/gnb/ui/components/Logo';
import { useModalStore } from '@/widgets/modal/model/useModalStore';
import { ProfileViewContent } from '@/widgets/profile/ui/ProfileViewContent';

const ICON_CLASS_NAME =
  'h-8 w-8 cursor-pointer transition duration-200 ease-in-out hover:scale-110 focus:scale-110';

export const Gnb = () => {
  const { data: minimalProfile } = useQuery<MinimalUserProfileDTO>(
    userQueries.getMyMinimalProfile
  );

  const location = useLocation();
  const path = location.pathname;

  // 경로 기반으로 GnbType 결정
  const gnbType: GnbType = path.startsWith('/team') ? 'team' : 'calendar';

  const { mutate: signOut } = useMutation({
    ...authQueries.signOut,
  });

  const openModal = useModalStore((state) => state.openModal);

  const handleProfileClick = () => {
    openModal({
      title: '내 정보',
      content: <ProfileViewContent />,
      leftButtonProps: {
        children: '닫기',
      },
      rightButtonProps: {
        children: '수정',
      },
    });
  };

  const handleLogoutClick = () => {
    signOut();
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
        {gnbType === 'calendar' && minimalProfile?.role === 'LEADER' && (
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
            <UserAvatar
              avatarUrl={minimalProfile?.profileImage}
              className={ICON_CLASS_NAME}
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel className='flex items-center gap-x-2'>
              <UserAvatar avatarUrl={minimalProfile?.profileImage} />
              <div className='flex flex-col gap-y-1.5'>
                <p>{minimalProfile?.username}</p>
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
