// import { DetailForm } from './DetailForm';
import { useParams } from 'react-router-dom';

import { mockCalendars } from '../model/mockData';
import { Details } from './Details';
import { FindEmptyTime } from './FindEmptyTime';

export const CalendarDetail = () => {
  const { eventId } = useParams();

  // eventId를 string에서 number로 변환
  const event = mockCalendars
    .flatMap((calendar) => calendar.events) // 모든 이벤트를 하나의 배열로 합치기
    .find((event) => event.id.toString() === eventId); // eventId와 일치하는 객체 찾기

  if (!event) {
    return <div>이벤트를 찾을 수 없습니다.</div>;
  }

  return (
    <div className='flex h-full w-full flex-col gap-4 lg:flex-row'>
      {/* <DetailForm /> */}
      <Details event={event} />
      <FindEmptyTime />
    </div>
  );
};
