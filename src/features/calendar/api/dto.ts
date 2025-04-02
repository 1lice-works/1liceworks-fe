export type CalendarTypeDTO = 'TEAM' | 'MEMBER' | 'OTHER';
export type PrivacyTypeDTO = 'PUBLIC' | 'PRIVATE';
export type AvailabilityTypeDTO = 'FREE' | 'BUSY';
export interface EventReminderDTO {
  notifyTime: string; // ISO 8601 형식의 타임스탬프 문자열
}

/**
 * 캘린더 정보 DTO
 * 사용자가 조회 가능한 캘린더 목록 조회 시 반환되는 정보
 */
export interface CalendarDTO {
  name: string;
  calendarId: number;
  calendarType: CalendarTypeDTO;
  typeId: number;
  isMyCalendar: boolean;
}

export type CalendarListDTO = CalendarDTO[];

/**
 * 일정 조회 결과 DTO
 * 서버에서 조회된 일정 상세 정보
 */
export interface EventDTO {
  eventId: number;
  title: string;
  description: string;
  dtStartTime: string; // ISO 8601 형식의 타임스탬프 문자열 (2025-03-06T01:16:56.032Z)
  dtEndTime: string; // ISO 8601 형식의 타임스탬프 문자열
  isAllDay: boolean;
  privacyType: PrivacyTypeDTO;
  availability: AvailabilityTypeDTO;
  location: string;
}

/**
 * 캘린더별 일정 목록 조회 결과 DTO
 * 특정 캘린더의 일정 목록을 조회할 때 반환되는 정보
 */
export interface CalendarEventsDTO {
  calendarId: number;
  calendarType: CalendarTypeDTO;
  isMyCalendar: boolean;
  eventDtos: EventDTO[];
}

/**
 * 캘린더 일정 조회 매개변수 DTO
 * 캘린더별 일정 목록 조회 시 사용되는 파라미터
 */
export interface CalendarEventsParamsDTO {
  calendarId: number;
  calendarType: CalendarTypeDTO;
  targetUserId?: number;
  targetMonth: number;
  targetYear: number;
}

/**
 * 이벤트 생성 및 수정 요청에 사용되는 DTO
 * 클라이언트에서 서버로 전송되는 일정 데이터 구조
 */
export interface EventRequestDTO {
  title: string;
  description: string;
  dtStartTime: string; // ISO 8601 형식의 타임스탬프 문자열 (2025-03-06T01:16:56.032Z)
  dtEndTime: string; // ISO 8601 형식의 타임스탬프 문자열
  isAllDay: boolean;
  privacyType: PrivacyTypeDTO;
  availability: AvailabilityTypeDTO;
  location: string;
  eventReminders: EventReminderDTO[];
}
