import { useNavigate } from 'react-router-dom';

import { ROUTES } from '@/shared/constants/routes';

import { EventTypes } from '../model/eventTypes';

interface CustomEventsProps {
  event: EventTypes;
}

export const CustomEvents = ({ event }: CustomEventsProps) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() =>
        navigate(ROUTES.CALENDAR.DETAIL.EVENT(event.id.toString()))
      }
    >
      <div>{event.title}</div>
    </div>
  );
};
