import { NavigateAction, View } from 'react-big-calendar';

export interface ToolbarTypes {
  date: Date;
  onNavigate: (navigate: NavigateAction, date?: Date | undefined) => void;
  onView: (view: View) => void;
  view: View;
}

export interface EventTypes {
  calendarId: number;
  id: number;
  title: string;
  start: Date;
  end: Date;
}

export interface EventFormTypes {
  calendarId: number;
  id: number;
  title: string;
  start: Date;
  end: Date;
}
