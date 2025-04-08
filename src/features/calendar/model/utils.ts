import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { z } from 'zod';

import {
  AvailabilityTypeDTO,
  CalendarEventsDTO,
  EventRequestDTO,
  PrivacyTypeDTO,
} from '@/features/calendar/api/dto';
import { eventSchema } from '@/features/calendar/model/eventSchema';
import { CalendarEventItem } from '@/features/calendar/model/types';

dayjs.extend(utc);
dayjs.extend(timezone);

/**
 * ISO 형식의 날짜 문자열을 Date 객체로 변환하는 함수
 * @param {string} isoString - '2025-02-24T10:00:00'
 * @returns {Date} - new Date(2025, 2, 24, 10, 0)
 */
const convertISOToKSTDate = (isoString: string): Date => {
  const kstDate = dayjs.utc(isoString).tz('Asia/Seoul');

  return new Date(
    kstDate.year(),
    kstDate.month(),
    kstDate.date(),
    kstDate.hour(),
    kstDate.minute()
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
      start: convertISOToKSTDate(event.dtStartTime),
      end: convertISOToKSTDate(event.dtEndTime),
      allDay: event.isAllDay,
      privacyType: event.privacyType,
      availability: event.availability,
      location: event.location,
    }))
  );
};

/**
 * 공개 타입(privacyType)을 한글로 변환하는 함수
 * @param {PrivacyTypeDTO} privacyType - 공개 타입 ('PUBLIC' | 'PRIVATE')
 * @returns {string} 한글로 변환된 공개 타입
 */
export const getPrivacyTypeInKorean = (privacyType: PrivacyTypeDTO): string => {
  const privacyTypeMap: Record<PrivacyTypeDTO, string> = {
    PUBLIC: '공개',
    PRIVATE: '비공개',
  };

  return privacyTypeMap[privacyType];
};

/**
 * 일정 상태(availability)를 한글로 변환하는 함수
 * @param {AvailabilityTypeDTO} availability - 일정 상태 ('FREE' | 'BUSY')
 * @returns {string} 한글로 변환된 일정 상태
 */
export const getAvailabilityInKorean = (
  availability: AvailabilityTypeDTO
): string => {
  const availabilityMap: Record<AvailabilityTypeDTO, string> = {
    FREE: '한가함',
    BUSY: '바쁨',
  };

  return availabilityMap[availability];
};

/**
 * 날짜와 시간을 조합하여 UTC 기준의 ISO 8601 형식 문자열로 변환하는 함수
 * @param {string} dateStr- '2025-04-01' 형식의 날짜 문자열
 * @param {string} timeStr - '00:00' 형식의 시간 문자열, 로컬 시간 기준
 * @returns {string} UTC 기준 ISO 8601 날짜-시간 문자열 (예: "2025-04-01T00:00:00.000Z")
 */
export const convertLocalDateToISO = (
  dateStr: string,
  timeStr: string
): string => {
  const dateTimeStr = `${dateStr}T${timeStr}:00`;
  const date = new Date(dateTimeStr); // 로컬 시간 기준
  return date.toISOString(); // UTC 기준 ISO 문자열 반환
};

/**
 * 주어진 ISO 형식 날짜에서 특정 시간 단위를 빼서 새로운 ISO 타임스탬프 반환
 */
export const subtractFromISO = (
  dtStartTime: string,
  time: number,
  unit: 'minutes' | 'hours' | 'days' | 'weeks'
): string => {
  return dayjs(dtStartTime).subtract(time, unit).toISOString();
};

/**
 * 폼 데이터를 API 요청 형식으로 변환하는 함수
 * @param formData EventForm에서 제출된 데이터
 * @returns API 요청에 사용할 수 있는 형식의 데이터
 */
export const convertFormDataToApiRequest = (
  formData: z.infer<typeof eventSchema>
): EventRequestDTO => {
  // 날짜와 시간 문자열을 ISO 형식의 타임스탬프로 변환
  const dtStartTime = convertLocalDateToISO(
    formData.startDate,
    formData.startTime
  );
  const dtEndTime = convertLocalDateToISO(formData.endDate, formData.endTime);

  // 알림 데이터 변환
  const eventReminders =
    formData.notification?.map((elem) => ({
      notifyTime: subtractFromISO(dtStartTime, elem.time, elem.unit),
    })) || [];

  return {
    title: formData.title,
    description: formData.description || '',
    dtStartTime,
    dtEndTime,
    isAllDay: formData.allDay,
    privacyType: formData.privacyType,
    availability: formData.availability,
    location: formData.location || '',
    eventReminders,
  };
};
