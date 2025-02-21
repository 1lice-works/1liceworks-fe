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
      className='flex w-full items-center gap-1 text-sm text-black'
      onClick={() =>
        navigate(ROUTES.CALENDAR.DETAIL.EVENT(event.id.toString()))
      }
    >
      <div
        className={`h-2 w-2 rounded-[50%]`}
        style={{ backgroundColor: color }}
      />
      <div className='font-semibold text-[#341D76]'>{event.title}</div>
      <div className='ml-auto'>{formatTime(event.start)}</div>
    </div>
  );
};
