import 'react-big-calendar/lib/css/react-big-calendar.css';

import dayjs from 'dayjs';
import { useCallback, useMemo, useState } from 'react';
import { Calendar, dayjsLocalizer } from 'react-big-calendar';

import { CustomEvents } from '@/features/calendar/ui/CustomEvents';

const localizer = dayjsLocalizer(dayjs);

// TODO) calendarId, events.id type 수정 (string으로 변경)
const mockCalendars = [
  {
    calendarId: 1,
    calendarName: '내 캘린더',
    events: [
      {
        id: 0,
        title: '회의 A',
        start: new Date(2025, 1, 15, 9, 0),
        end: new Date(2025, 1, 15, 17, 0),
      },
      {
        id: 1,
        title: '업무 보고',
        start: new Date(2025, 1, 16, 10, 0),
        end: new Date(2025, 1, 16, 11, 0),
      },
      {
        id: 2,
        title: '프로젝트 회의',
        start: new Date(2025, 0, 20, 14, 0),
        end: new Date(2025, 0, 22, 14, 0),
      },
      {
        id: 3,
        title: '팀 미팅',
        start: new Date(2025, 0, 25, 13, 0),
        end: new Date(2025, 0, 25, 14, 0),
      },
    ],
  },
  {
    calendarId: 2,
    calendarName: '팀 캘린더',
    events: [
      {
        id: 4,
        title: '컨퍼런스 참석',
        start: new Date(2025, 1, 5, 9, 0),
        end: new Date(2025, 1, 8, 18, 0),
      },
      {
        id: 5,
        title: '세미나 발표',
        start: new Date(2025, 1, 12, 10, 0),
        end: new Date(2025, 1, 14, 16, 0),
      },
      {
        id: 6,
        title: '주간 회의',
        start: new Date(2025, 1, 20, 16, 0),
        end: new Date(2025, 1, 20, 17, 0),
      },
    ],
  },
  {
    calendarId: 3,
    calendarName: '정경준 / 직급',
    events: [
      {
        id: 7,
        title: '주말 워크샵',
        start: new Date(2025, 1, 21, 9, 0),
        end: new Date(2025, 1, 21, 18, 0),
      },
      {
        id: 8,
        title: '하계 세미나',
        start: new Date(2025, 1, 17, 8, 0),
        end: new Date(2025, 1, 17, 16, 0),
      },
      {
        id: 9,
        title: '업무 미팅',
        start: new Date(2025, 1, 24, 11, 0),
        end: new Date(2025, 1, 24, 12, 0),
      },
    ],
  },
];

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
    return {
      style: { backgroundColor },
    };
  }, []);

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
