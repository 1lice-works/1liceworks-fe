import { CalendarEventsDTO } from '@/features/calendar/api/dto';
import { CalendarEventItem } from '@/features/calendar/model/types';

/**
 * ISO 형식의 날짜 문자열을 Date 객체로 변환하는 함수
 * @param {string} isoString - '2025-02-24T10:00:00'
 * @returns {Date} - new Date(2025, 2, 24, 10, 0)
 */
const convertISOToDate = (isoString: string): Date => {
  const date = new Date(isoString);

  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    date.getHours(),
    date.getMinutes()
  );
};

/**
 * API 응답으로 받은 eventsData를 big-calendar의 events 형식으로 변환하는 함수
 * @param {CalendarEventsDTO[]} eventsData - API에서 반환된 캘린더 이벤트 데이터 배열
 * @returns {CalendarEventItem[]} - Big Calendar 컴포넌트에서 사용할 수 있는 형식의 이벤트 배열
 */
export const transformEventsForBigCalendar = (
  eventsData: CalendarEventsDTO[]
): CalendarEventItem[] => {
  return eventsData.flatMap((calendar) =>
    calendar.eventDtos.map((event) => ({
      calendarId: calendar.calendarId,
      eventId: event.eventId,
      title: event.title,
      start: convertISOToDate(event.dtStartTime),
      end: convertISOToDate(event.dtEndTime),
      allDay: event.isAllDay,
      //   description: event.description,
      //   location: event.location,
      //   privacyType: event.privacyType,
      //   availability: event.availability,
    }))
  );
};

/**
 * 주어진 start와 end가 동일한 날짜에 속하는지 확인하는 함수
 * @param {Date} start - 일정의 시작 날짜
 * @param {Date} end - 일정의 종료 날짜
 * @returns {Boolean} 주어진 날짜들이 같은 날짜에 속하면 true, 그렇지 않으면 false
 */
export const isSameDayEvent = (start: Date, end: Date): boolean => {
  const startDate = new Date(start).setHours(0, 0, 0, 0);
  const endDate = new Date(end).setHours(0, 0, 0, 0);

  return startDate === endDate;
};
