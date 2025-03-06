import 'react-big-calendar/lib/css/react-big-calendar.css';

import dayjs from 'dayjs';
import { useMemo } from 'react';
import { Calendar, dayjsLocalizer } from 'react-big-calendar';

import { mockCalendars } from '@/features/calendar/model/mockData';
import { useCalendarStore } from '@/features/calendar/model/useCalendarStore';
import { CustomEvents } from '@/features/calendar/ui/CustomEvents';
import { CustomToolbar } from '@/features/calendar/ui/CustomToolbar';

const localizer = dayjsLocalizer(dayjs);

export const CalendarPage = () => {
  const checkedCalendarIds = useCalendarStore(
    (state) => state.checkedCalendarIds
  );

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
        components={{
          toolbar: (props) => <CustomToolbar {...props} />,
          event: (props) => <CustomEvents {...props} />,
        }}
      />
    </div>
  );
};
