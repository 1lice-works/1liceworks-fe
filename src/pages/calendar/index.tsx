import 'react-big-calendar/lib/css/react-big-calendar.css';

import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { useMemo, useState } from 'react';
import { Calendar, dayjsLocalizer } from 'react-big-calendar';

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
import { CustomEvent } from '@/features/calendar/ui/CustomEvent';
import { CustomToolbar } from '@/features/calendar/ui/CustomToolbar';

dayjs.extend(utc);

const localizer = dayjsLocalizer(dayjs);

export const CalendarPage = () => {
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
        onNavigate={(newDate) => setCurrDate(newDate)}
        components={{
          toolbar: (props) => <CustomToolbar {...props} />,
          event: (props) => <CustomEvent {...props} />,
        }}
        showAllEvents
      />
    </div>
  );
};
