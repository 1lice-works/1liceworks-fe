import { useLocation } from 'react-router-dom';

import { CalendarEventItem } from '@/features/calendar/model/types';
import { EventForm } from '@/features/calendar/ui/EventForm';
import { ROUTES } from '@/shared/constants/routes';

export const EventFormPage = () => {
  const location = useLocation();
  const selectedEvent = location.state?.selectedEvent as
    | CalendarEventItem
    | undefined;
  const isCreate = location.pathname === ROUTES.CALENDAR.NEW;

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

  return <EventForm event={eventInfo} />;
};
