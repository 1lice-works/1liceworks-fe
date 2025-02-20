import { EventTypes } from '../model/eventTypes';

interface CustomEventsProps {
  event: EventTypes;
}

export const CustomEvents = ({ event }: CustomEventsProps) => {
  return (
    <div>
      <div>{event.title}</div>
    </div>
  );
};
