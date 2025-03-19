import { CalendarEventItem } from '@/features/calendar/model/types';

import { FindEmptyTime } from './FindEmptyTime';

interface EventEditFormProps {
  setIsEdit: (props: boolean) => void;
  event: CalendarEventItem;
}

export const EventEditForm = ({ event, setIsEdit }: EventEditFormProps) => {
  // TODO) event의 필드 값을 default value로 설정하기

  return (
    <div className='flex h-full w-full'>
      <form></form>
      {event.calendarType === 'TEAM' && <FindEmptyTime />}
    </div>
  );
};
