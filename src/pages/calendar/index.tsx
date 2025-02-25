import 'react-big-calendar/lib/css/react-big-calendar.css';

import dayjs from 'dayjs';
import { useCallback, useMemo, useState } from 'react';
import { Calendar, dayjsLocalizer } from 'react-big-calendar';

import { mockCalendars } from '@/features/calendar/model/mockData';
import { CustomEvents } from '@/features/calendar/ui/CustomEvents';

const localizer = dayjsLocalizer(dayjs);

export const CalendarPage = () => {
  const [displays, setDisplays] = useState(() =>
    Object.fromEntries(
      mockCalendars.map((calendar) => [calendar.calendarId, true])
    )
  );

  const toggleCalendarDisplay = useCallback((calendarId: number) => {
    setDisplays((prevDisplays) => ({
      ...prevDisplays,
      [calendarId]: !prevDisplays[calendarId], // 선택된 캘린더의 display 상태를 토글
    }));
  }, []);

  const filteredCalendars = useMemo(
    () => mockCalendars.filter((calendar) => displays[calendar.calendarId]),
    [displays]
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

  const eventPropGetter = useCallback((event: { calendarId: number }) => {
    // const backgroundColor = calendarColors[event.calendarId];
    const backgroundColor = 'transparent';
    console.log(backgroundColor);
    console.log(event);
    return {
      style: { backgroundColor },
    };
  }, []);

  // localStorage.clear();

  return (
    <div className='h-full'>
      <div className='flex gap-4 pb-4'>
        {mockCalendars.map((calendar) => (
          <div key={calendar.calendarId}>
            <label>
              <input
                type='checkbox'
                checked={displays[calendar.calendarId]}
                onChange={() => toggleCalendarDisplay(calendar.calendarId)}
              />
              {calendar.calendarName}
            </label>
          </div>
        ))}
      </div>

      <Calendar
        localizer={localizer}
        events={eventsToDisplay}
        eventPropGetter={eventPropGetter}
        onSelectEvent={(e) => console.log(e)}
        components={{
          event: (props) => <CustomEvents {...props} />,
        }}
      />
    </div>
  );
};
