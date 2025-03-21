import { CalendarEventItem } from '@/features/calendar/model/types';

import { FindEmptyTime } from './FindEmptyTime';

interface EventFormProps {
  event: CalendarEventItem;
}

export const EventForm = ({ event }: EventFormProps) => {
  // TODO) event의 필드 값을 default value로 설정하기

  return (
    <div className='flex h-full w-full gap-x-4'>
      <form className='grow'></form>
      {event.calendarType === 'TEAM' && <FindEmptyTime />}
    </div>
  );
};
