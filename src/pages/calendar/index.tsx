import 'react-big-calendar/lib/css/react-big-calendar.css';

import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';

const localizer = momentLocalizer(moment);

export const CalendarPage = () => {
  return (
    <div className='h-full'>
      <Calendar localizer={localizer} />
    </div>
  );
};
