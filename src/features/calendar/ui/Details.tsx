import { EyeIcon } from 'lucide-react';

import { AlertIcon } from '@/shared/icons/AlertIcon';
import { ClockIcon } from '@/shared/icons/ClockIcon';
import { SimpleCalendarIcon } from '@/shared/icons/SimpleCalendarIcon';
import { formYMDT } from '@/shared/lib/dayjs';
import { Button } from '@/shared/ui/shadcn/Button';

import { EventTypes } from '../model/eventTypes';

interface DetailsProps {
  event: EventTypes;
}

export const Details = ({ event }: DetailsProps) => {
  // calendarID === 1 내 캘린더
  // calendarID === 2 내 캘린더
  // calendarID === 3 팀원/직급 캘린더

  // calendarId에 따른 캘린더 이름 매핑
  const getCalendarName = (calendarId: number) => {
    const calendarMap: Record<number, string> = {
      1: '내 캘린더',
      2: '팀 캘린더',
      3: '정경준 / 직급 캘린더',
    };

    return calendarMap[calendarId] || '알 수 없는 캘린더'; // 기본값 처리
  };

  return (
    <div className='flex w-full flex-col gap-4'>
      <div className='mb-4 flex items-center gap-2'>
        <div className='w-full text-xl font-semibold'>{event.title}</div>
        <Button>수정</Button>
        <Button variant='destructive'>삭제</Button>
      </div>
      <div className='flex items-center gap-2'>
        <ClockIcon />
        <span>{formYMDT(event.start)}</span>
        <span>-</span>
        <span>{formYMDT(event.end)}</span>
      </div>
      <div className='flex items-center gap-2'>
        <AlertIcon />
        <p>10분전</p>
      </div>
      <div className='flex items-center gap-2'>
        <SimpleCalendarIcon />
        <p>{getCalendarName(event.calendarId)}</p>
      </div>
      <div className='flex items-center gap-2'>
        <EyeIcon />
        <span>공개</span>
        <span>바쁨</span>
      </div>
    </div>
  );
};
