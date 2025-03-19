import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import { EventDetailsView } from '@/features/calendar/ui/EventDetailsView';
import { EventEditForm } from '@/features/calendar/ui/EventEditForm';

export const EventDetails = () => {
  const location = useLocation();
  const selectedEvent = location.state?.selectedEvent;

  const [isEdit, setIsEdit] = useState<boolean>(false);

  if (!selectedEvent) {
    return <div>이벤트를 찾을 수 없습니다.</div>;
  }

  return (
    <div className='flex h-full w-full flex-col gap-4 lg:flex-row'>
      {isEdit ? (
        <EventEditForm event={selectedEvent} setIsEdit={setIsEdit} />
      ) : (
        <EventDetailsView event={selectedEvent} setIsEdit={setIsEdit} />
      )}
    </div>
  );
};
