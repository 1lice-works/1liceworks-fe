export type CalendarTypeDTO = 'TEAM' | 'MEMBER' | 'OTHER';

export interface CalendarDTO {
  name: string;
  calendarId: number;
  calendarType: CalendarTypeDTO;
  typeId: number;
  isMyCalendar: boolean;
}

export type CalendarListDTO = CalendarDTO[];
