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
      calendarType: calendar.calendarType,
      isMyCalendar: calendar.isMyCalendar,
      eventId: event.eventId,
      title: event.title,
      description: event.description,
      start: convertISOToDate(event.dtStartTime),
      end: convertISOToDate(event.dtEndTime),
      allDay: event.isAllDay,
      privacyType: event.privacyType,
      availability: event.availability,
      location: event.location,
    }))
  );
};
