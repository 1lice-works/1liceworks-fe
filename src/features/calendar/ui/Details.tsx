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
        <p>내 캘린더</p>
      </div>
      <div className='flex items-center gap-2'>
        <EyeIcon />
        <span>공개</span>
        <span>바쁨</span>
      </div>
    </div>
  );
};
