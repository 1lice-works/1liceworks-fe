import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import { DetailForm } from '@/features/calendar/ui/DetailForm';
import { Details } from '@/features/calendar/ui/Details';

export const CalendarDetail = () => {
  const location = useLocation();
  const selectedEvent = location.state?.selectedEvent;

  const [isEdit, setIsEdit] = useState<boolean>(false);

  if (!selectedEvent) {
    return <div>이벤트를 찾을 수 없습니다.</div>;
  }

  return (
    <div className='flex h-full w-full flex-col gap-4 lg:flex-row'>
      {isEdit ? (
        <DetailForm event={selectedEvent} setIsEdit={setIsEdit} />
      ) : (
        <Details event={selectedEvent} setIsEdit={setIsEdit} />
      )}
    </div>
  );
};
