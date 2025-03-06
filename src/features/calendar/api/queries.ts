import { CalendarListDTO } from '@/features/calendar/api/dto';
import { calendarService } from '@/features/calendar/api/service';

export const calendarQueries = {
  getCalendars: {
    queryKey: ['calendar-list'],
    queryFn: async (): Promise<CalendarListDTO> => {
      const response = await calendarService.getCalendarList();
      return response.result;
    },
  },
};
