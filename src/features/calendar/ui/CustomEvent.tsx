import { calendarColors } from '@/features/calendar/model/constants';
import { CalendarEventItem } from '@/features/calendar/model/types';
import { formatTime, isSameDate } from '@/shared/lib/dayjs';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/ui/shadcn/Popover';

import { getAvailabilityInKorean } from '../model/utils';
import { EventDetailsView } from './EventDetailsView';

interface CustomEventProps {
  event: CalendarEventItem;
}

const hexToRgba = (hex: string, alpha: number = 0.2): string => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const CustomEvent = ({ event }: CustomEventProps) => {
  const hexColor = calendarColors[event.calendarId];
  const bgColorWithOpacity = hexToRgba(hexColor);

  // 팀원의 비공개 일정일 경우 제한된 정보만 표시
  const isRestrictedEvent =
    !event.isMyCalendar && event.privacyType === 'PRIVATE';

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div
          className='text-foreground flex w-full items-center justify-between gap-x-1 rounded-xs border-l-4 px-1 py-0.5 text-xs'
          style={{ backgroundColor: bgColorWithOpacity, borderColor: hexColor }}
        >
          <p className='truncate font-medium'>
            {isRestrictedEvent
              ? getAvailabilityInKorean(event.availability)
              : event.title
                ? event.title
                : '(제목 없음)'}
          </p>

          {isSameDate(event.start, event.end) && !event.allDay && (
            <p className='text-muted-foreground'>{formatTime(event.start)}</p>
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent className='max-h-96 w-fit max-w-96 overflow-auto'>
        <EventDetailsView event={event} isRestrictedEvent={isRestrictedEvent} />
      </PopoverContent>
    </Popover>
  );
};
