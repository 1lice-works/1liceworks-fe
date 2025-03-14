import 'react-big-calendar/lib/css/react-big-calendar.css';

import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useMemo, useState } from 'react';
import { Calendar, dayjsLocalizer } from 'react-big-calendar';

import { CalendarListDTO } from '@/features/calendar/api/dto';
import {
  calendarQueries,
  useCalendarEvents,
} from '@/features/calendar/api/queries';
import { mockCalendars } from '@/features/calendar/model/mockData';
import { useCalendarStore } from '@/features/calendar/model/useCalendarStore';
import { CustomEvents } from '@/features/calendar/ui/CustomEvents';
import { CustomToolbar } from '@/features/calendar/ui/CustomToolbar';

const localizer = dayjsLocalizer(dayjs);

export const CalendarPage = () => {
  const [currDate, setCurrDate] = useState(new Date());

  const checkedCalendarIds = useCalendarStore(
    (state) => state.checkedCalendarIds
  );

  const { data: calendars } = useQuery<CalendarListDTO>({
    ...calendarQueries.getCalendars,
  });

  // useCalendarEvents 커스텀 훅 사용
  const calendarEventsQueries = useCalendarEvents(
    checkedCalendarIds,
    calendars,
    currDate
  );

  const eventsData = calendarEventsQueries.map((query) => query.data);
  console.log('데이터', eventsData);

  // TODO) eventsToDisplay를 eventsData로 대체
  // TODO) filteredCalendars는 제거
  const filteredCalendars = useMemo(
    () =>
      mockCalendars.filter((calendar) =>
        checkedCalendarIds.includes(calendar.calendarId)
      ),
    [checkedCalendarIds]
  );

  const eventsToDisplay = useMemo(
    () =>
      filteredCalendars.flatMap((calendar) =>
        calendar.events.map((event) => {
          return { ...event, calendarId: calendar.calendarId };
        })
      ),
    [filteredCalendars]
  );

  return (
    <div className='h-full'>
      <Calendar
        localizer={localizer}
        events={eventsToDisplay}
        onSelectEvent={(e) => console.log(e)}
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
