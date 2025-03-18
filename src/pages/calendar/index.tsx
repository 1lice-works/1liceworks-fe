import 'react-big-calendar/lib/css/react-big-calendar.css';

import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useMemo, useState } from 'react';
import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import { useNavigate } from 'react-router-dom';

import {
  CalendarEventsDTO,
  CalendarListDTO,
} from '@/features/calendar/api/dto';
import {
  calendarQueries,
  useCalendarEvents,
} from '@/features/calendar/api/queries';
import { useCalendarStore } from '@/features/calendar/model/useCalendarStore';
import { transformEventsForBigCalendar } from '@/features/calendar/model/utils';
import { CustomEvents } from '@/features/calendar/ui/CustomEvents';
import { CustomToolbar } from '@/features/calendar/ui/CustomToolbar';
import { ROUTES } from '@/shared/constants/routes';

const localizer = dayjsLocalizer(dayjs);

export const CalendarPage = () => {
  const navigate = useNavigate();

  const [currDate, setCurrDate] = useState(new Date());

  const checkedCalendarIds = useCalendarStore(
    (state) => state.checkedCalendarIds
  );

  const { data: calendars } = useQuery<CalendarListDTO>({
    ...calendarQueries.getCalendars,
  });

  const calendarEventsQueries = useCalendarEvents(
    checkedCalendarIds,
    calendars,
    currDate
  );

  const eventsData = calendarEventsQueries
    .map((query) => query.data)
    .filter(Boolean);

  const eventsToDisplay = useMemo(() => {
    if (eventsData.length === 0) return [];

    const transformedEvents = transformEventsForBigCalendar(
      eventsData as CalendarEventsDTO[]
    );

    return transformedEvents;
  }, [eventsData]);

  return (
    <div className='h-full'>
      <Calendar
        localizer={localizer}
        events={eventsToDisplay}
        onSelectEvent={(e) =>
          navigate(ROUTES.CALENDAR.DETAIL.EVENT(e.eventId.toString()))
        }
        onNavigate={(newDate) => setCurrDate(newDate)}
        components={{
          toolbar: (props) => <CustomToolbar {...props} />,
          event: (props) => <CustomEvents {...props} />,
        }}
        showAllEvents
      />
    </div>
  );
};
