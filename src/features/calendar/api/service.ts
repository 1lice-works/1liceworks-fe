import { CalendarListDTO } from '@/features/calendar/api/dto';
import { apiClient } from '@/shared/api/apiClient';
import { ApiResponse } from '@/shared/types/apiResponse';

export const calendarService = {
  getCalendarList: async (): Promise<ApiResponse<CalendarListDTO>> => {
    const response = await apiClient.get<CalendarListDTO>({
      url: '/calendar',
    });

    return response;
  },

  getEvents: async () => {},
};
