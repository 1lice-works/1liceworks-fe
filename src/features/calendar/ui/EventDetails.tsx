import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import { CalendarEventItem } from '@/features/calendar/model/types';
import { EventDetailsView } from '@/features/calendar/ui/EventDetailsView';
import { EventEditForm } from '@/features/calendar/ui/EventEditForm';
import { ROUTES } from '@/shared/constants/routes';

export const EventDetails = () => {
  const location = useLocation();
  const selectedEvent = location.state?.selectedEvent as
    | CalendarEventItem
    | undefined;
  const isCreate = location.pathname === ROUTES.CALENDAR.NEW;

  const [isEdit, setIsEdit] = useState<boolean>(false);

  const today = new Date();
  const emptyEvent: CalendarEventItem = {
    calendarId: 0,
    calendarType: 'MEMBER',
    isMyCalendar: true,
    eventId: 0,
    title: '',
    description: '',
    start: today,
    end: today,
    allDay: false,
    privacyType: 'PUBLIC',
    availability: 'FREE',
    location: '',
  };

  const eventInfo = isCreate || !selectedEvent ? emptyEvent : selectedEvent;

  if (!isCreate && !selectedEvent) {
    return <div>이벤트를 찾을 수 없습니다.</div>;
  }

  return (
    <div className='flex h-full w-full flex-col gap-4 lg:flex-row'>
      {isEdit || isCreate ? (
        <EventEditForm event={eventInfo} setIsEdit={setIsEdit} />
      ) : (
        <EventDetailsView event={eventInfo} setIsEdit={setIsEdit} />
      )}
    </div>
  );
};
