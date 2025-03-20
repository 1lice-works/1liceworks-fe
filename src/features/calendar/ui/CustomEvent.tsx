import { Circle } from 'lucide-react';

import { calendarColors } from '@/features/calendar/model/constants';
import { CalendarEventItem } from '@/features/calendar/model/types';
import { formatTime, isSameDate } from '@/shared/lib/dayjs';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/ui/shadcn/popover';

import { getAvailabilityInKorean } from '../model/utils';
import { EventDetailsView } from './EventDetailsView';

interface CustomEventProps {
  event: CalendarEventItem;
}

export const CustomEvent = ({ event }: CustomEventProps) => {
  const color = calendarColors[event.calendarId];

  // 팀원의 비공개 일정일 경우 제한된 정보만 표시
  const isRestrictedEvent =
    !event.isMyCalendar && event.privacyType === 'PRIVATE';

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className='text-foreground flex w-full items-center justify-between gap-x-1 text-sm'>
          <div className='flex min-w-0 items-center gap-x-1'>
            <Circle
              className='size-2 shrink-0 rounded-full'
              style={{ backgroundColor: color, color: color }}
            />
            <p className='truncate font-medium'>
              {isRestrictedEvent
                ? getAvailabilityInKorean(event.availability)
                : event.title
                  ? event.title
                  : '(제목 없음)'}
            </p>
          </div>

          {isSameDate(event.start, event.end) && !event.allDay && (
            <p className='text-muted-foreground'>{formatTime(event.start)}</p>
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent className='w-80'>
        <EventDetailsView event={event} isRestrictedEvent={isRestrictedEvent} />
      </PopoverContent>
    </Popover>
  );
};
