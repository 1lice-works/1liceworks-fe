import { NavigateAction, View } from 'react-big-calendar';

export interface ToolbarTypes {
  date: Date;
  onNavigate: (navigate: NavigateAction, date?: Date | undefined) => void;
  onView: (view: View) => void;
  view: View;
}

export interface CalendarEventItem {
  calendarId: number;
  eventId: number;
  title: string;
  start: Date;
  end: Date;
  allDay: boolean;
  // description: string;
  // location: string;
  // privacyType: string;
  // availability: string;
}
