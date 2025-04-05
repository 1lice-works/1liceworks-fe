import { z } from 'zod';

import {
  CalendarEventsDTO,
  CalendarEventsParamsDTO,
  CalendarListDTO,
} from '@/features/calendar/api/dto';
import { eventSchema } from '@/features/calendar/model/eventSchema';
import { convertFormDataToApiRequest } from '@/features/calendar/model/utils';
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

  createMyEvent: async (
    formData: z.infer<typeof eventSchema>
  ): Promise<ApiResponse<{}>> => {
    const response = await apiClient.post<{}>({
      url: '/calendar/my-events',
      data: convertFormDataToApiRequest(formData),
    });

    return response;
  },

  deleteMyEvent: async (eventId: number): Promise<ApiResponse<{}>> => {
    const response = await apiClient.delete<{}>({
      url: 'calendar/my-events',
      params: { eventId },
    });

    return response;
  },

  deleteTeamEvent: async (
    calendarId: number,
    eventId: number
  ): Promise<ApiResponse<{}>> => {
    const response = await apiClient.delete<{}>({
      url: 'calendar/team-events',
      params: { calendarId, eventId },
    });

    return response;
  },
};
