import { Messages, NavigateAction, View, ViewsProps } from 'react-big-calendar';

export interface ToolbarTypes {
  date: Date;
  localizer?: { messages: Messages<any> }; // localizer는 객체로 변경
  onNavigate: (navigate: NavigateAction, date?: Date | undefined) => void;
  onView: (view: View) => void;
  view: View;
  views: ViewsProps<
    { calendarId: number; id: number; title: string; start: Date; end: Date },
    object
  >;
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
