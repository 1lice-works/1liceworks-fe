import { Settings, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

import { ROUTES } from '@/shared/constants/routes';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/shadcn/Button';
import { Separator } from '@/shared/ui/shadcn/Separator';

export const TeamLnb = () => {
  return (
    <div className='bg-background-light flex h-full flex-col gap-y-4 border-r p-4'>
      <div className='flex flex-col gap-y-2'>
        <div className='flex h-5 items-center space-x-2 font-semibold'>
          <p>팀장</p>
          <Separator orientation='vertical' />
          <p>양혜림</p>
        </div>
        <div className='flex h-5 items-center space-x-2 font-semibold'>
          <p>팀</p>
          <Separator orientation='vertical' />
          <p>2차 1팀</p>
        </div>
      </div>
      <Separator />

      <div className='flex flex-col gap-y-2'>
        <Button
          variant='ghost'
          className={cn(`justify-start px-2 text-base font-semibold`)}
        >
          {/* TODO) 경로 변경 */}

          <Link to={ROUTES.TEAM.root} className='flex items-center gap-x-2'>
            <Settings />팀 설정
          </Link>
        </Button>

        <div className='text-muted-foreground flex flex-col gap-y-2 px-2 text-sm'>
          <p>팀 정보</p>
          <p>웹훅 연동</p>
          <p>팀장 위임</p>
          <p>탈퇴</p>
          <p>팀 삭제</p>
        </div>
      </div>

      <Separator />

      <div className='flex flex-col gap-y-2'>
        <Button
          variant='ghost'
          className={cn(`justify-start px-2 text-base font-semibold`)}
        >
          {/* TODO) 경로 변경 */}
          <Link to={ROUTES.TEAM.root} className='flex items-center gap-x-2'>
            <Users />
            구성원 설정
          </Link>
        </Button>

        <div className='text-muted-foreground flex flex-col gap-y-2 px-2 text-sm'>
          <p>구성원 목록</p>
          <p>직책, 직급, 사용자 유형</p>
        </div>
      </div>
    </div>
  );
};
