import { Circle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from '@/shared/constants/routes';
import { formatTime } from '@/shared/lib/dayjs';

import { calendarColors } from '../model/constants';
import { EventTypes } from '../model/eventTypes';

interface CustomEventsProps {
  event: EventTypes;
}

export const CustomEvents = ({ event }: CustomEventsProps) => {
  const navigate = useNavigate();
  const color = calendarColors[event.calendarId];

  return (
    <div
      className='text-foreground flex w-full items-center justify-between gap-x-1 text-sm'
      onClick={() =>
        navigate(ROUTES.CALENDAR.DETAIL.EVENT(event.id.toString()))
      }
    >
      <div className='flex min-w-0 items-center gap-x-1'>
        <Circle
          className='size-2 shrink-0 rounded-full'
          style={{ backgroundColor: color, color: color }}
        />
        <p className='truncate font-medium'>{event.title}</p>
      </div>
      <p className='text-muted-foreground'>{formatTime(event.start)}</p>
    </div>
  );
};
