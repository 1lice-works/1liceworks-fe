import { NavigateAction, View } from 'react-big-calendar';

import { CalendarTypeDTO } from '@/features/calendar/api/dto';

export interface ToolbarTypes {
  date: Date;
  onNavigate: (navigate: NavigateAction, date?: Date | undefined) => void;
  onView: (view: View) => void;
  view: View;
}

export interface CalendarEventItem {
  calendarId: number;
  calendarType: CalendarTypeDTO;
  isMyCalendar: boolean;
  eventId: number;
  title: string;
  description: string;
  start: Date;
  end: Date;
  allDay: boolean;
  privacyType: string;
  availability: string;
  location: string;
}
