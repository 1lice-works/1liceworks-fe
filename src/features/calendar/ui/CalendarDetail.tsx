// import { DetailForm } from './DetailForm';
import { useParams } from 'react-router-dom';

import { mockCalendars } from '../model/mockData';
import { Details } from './Details';
import { FindEmptyTime } from './FindEmptyTime';

export const CalendarDetail = () => {
  const { eventId } = useParams();

  // eventId와 일치하는 이벤트를 찾고, 해당 이벤트의 calendarId도 함께 저장
  const foundEvent = mockCalendars
    .map((calendar) =>
      calendar.events.map((event) => ({
        ...event,
        calendarId: calendar.calendarId, // calendarId 추가
      }))
    )
    .flat()
    .find((event) => event.id.toString() === eventId);

  if (!foundEvent) {
    return <div>이벤트를 찾을 수 없습니다.</div>;
  }

  return (
    <div className='flex h-full w-full flex-col gap-4 lg:flex-row'>
      {/* <DetailForm /> */}
      <Details event={foundEvent} />
      <FindEmptyTime />
    </div>
  );
};
