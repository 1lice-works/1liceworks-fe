export type CalendarTypeDTO = 'TEAM' | 'MEMBER' | 'OTHER';
export type PrivacyTypeDTO = 'PUBLIC' | 'PRIVATE';
export type AvailabilityTypeDTO = 'FREE' | 'BUSY';

export interface CalendarDTO {
  name: string;
  calendarId: number;
  calendarType: CalendarTypeDTO;
  typeId: number;
  isMyCalendar: boolean;
}

export type CalendarListDTO = CalendarDTO[];

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

export interface CalendarEventsDTO {
  calendarId: number;
  calendarType: CalendarTypeDTO;
  isMyCalendar: boolean;
  eventDtos: EventDTO[];
}

export interface CalendarEventsParamsDTO {
  calendarId: number;
  calendarType: CalendarTypeDTO;
  targetUserId?: number;
  targetMonth: number;
  targetYear: number;
}
