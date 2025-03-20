import { Circle } from 'lucide-react';

import { calendarColors } from '@/features/calendar/model/constants';
import { CalendarEventItem } from '@/features/calendar/model/types';
import { formatTime, isSameDate } from '@/shared/lib/dayjs';

interface CustomEventProps {
  event: CalendarEventItem;
}

export const CustomEvent = ({ event }: CustomEventProps) => {
  const color = calendarColors[event.calendarId];

  return (
    <div className='text-foreground flex w-full items-center justify-between gap-x-1 text-sm'>
      <div className='flex min-w-0 items-center gap-x-1'>
        <Circle
          className='size-2 shrink-0 rounded-full'
          style={{ backgroundColor: color, color: color }}
        />
        <p className='truncate font-medium'>
          {event.title ? event.title : '(제목 없음)'}
        </p>
      </div>
      {isSameDate(event.start, event.end) && !event.allDay && (
        <p className='text-muted-foreground'>{formatTime(event.start)}</p>
      )}
    </div>
  );
};
