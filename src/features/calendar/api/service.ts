import {
  CalendarEventsDTO,
  CalendarEventsParamsDTO,
  CalendarListDTO,
} from '@/features/calendar/api/dto';
import { apiClient } from '@/shared/api/apiClient';
import { ApiResponse } from '@/shared/types/apiResponse';

export const calendarService = {
  getCalendarList: async (): Promise<ApiResponse<CalendarListDTO>> => {
    const response = await apiClient.get<CalendarListDTO>({
      url: '/calendar',
    });

    return response;
  },

  getCalendarEvents: async ({
    calendarId,
    calendarType,
    targetUserId,
    targetMonth,
    targetYear,
  }: CalendarEventsParamsDTO): Promise<ApiResponse<CalendarEventsDTO>> => {
    const params = new URLSearchParams();
    params.append('calendarId', calendarId.toString());
    params.append('targetMonth', targetMonth.toString());
    params.append('targetYear', targetYear.toString());

    // targetUserId는 calendarType이 'MEMBER'일 때만 필요
    if (calendarType === 'MEMBER' && targetUserId) {
      params.append('targetUserId', targetUserId.toString());
    }

    const response = await apiClient.get<CalendarEventsDTO>({
      url: `calendar/events/${calendarType}`,
      params: params,
    });

    return response;
  },
};
