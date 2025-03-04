import { Settings, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

import { ROUTES } from '@/shared/constants/routes';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/shadcn/Button';
import { Separator } from '@/shared/ui/shadcn/Separator';

const TEAM_LNB_MENU = [
  {
    icon: <Settings />,
    title: '팀 설정',
    path: ROUTES.TEAM.root, // TODO) 실제 경로로 업데이트
    items: ['팀 정보', '웹훅 연동', '팀장 위임', '탈퇴', '팀 삭제'],
  },
  {
    icon: <Users />,
    title: '구성원 설정',
    path: ROUTES.TEAM.root, // TODO) 실제 경로로 업데이트
    items: ['구성원 목록', '직책, 직급, 사용자 유형'],
  },
];

export const TeamLnb = () => {
  return (
    <div className='bg-background-light flex h-full flex-col gap-y-4 border-r p-4'>
      <div className='flex flex-col gap-y-2'>
        <div className='flex h-5 items-center space-x-2 font-semibold'>
          <p>팀장</p>
          <Separator orientation='vertical' />
          {/* TODO) 실제 유저 정보로 변경 */}
          <p>양혜림</p>
        </div>
        <div className='flex h-5 items-center space-x-2 font-semibold'>
          <p>팀</p>
          <Separator orientation='vertical' />
          {/* TODO) 실제 유저 정보로 변경 */}
          <p>2차 1팀</p>
        </div>
      </div>

      {TEAM_LNB_MENU.map((menu, index) => (
        <div className='flex flex-col gap-y-2 border-t py-2' key={index}>
          <Button
            variant='ghost'
            className={cn(`justify-start px-2 text-base font-semibold`)}
          >
            <Link to={menu.path} className='flex items-center gap-x-2'>
              {menu.icon}
              {menu.title}
            </Link>
          </Button>

          <div className='text-muted-foreground flex flex-col gap-y-2 px-2 text-sm'>
            {menu.items.map((item, index) => (
              <p key={index}>{item}</p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
