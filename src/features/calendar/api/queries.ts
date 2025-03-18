import { useQueries } from '@tanstack/react-query';

import {
  CalendarEventsDTO,
  CalendarListDTO,
} from '@/features/calendar/api/dto';
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

// 여러 캘린더의 이벤트를 한번에 조회하는 커스텀 훅
export const useCalendarEvents = (
  checkedCalendarIds: number[],
  calendars: CalendarListDTO | undefined,
  date: Date
) => {
  const targetYear = date.getFullYear();
  const targetMonth = date.getMonth() + 1;

  return useQueries({
    queries: checkedCalendarIds.map((calendarId) => {
      const calendarInfo = calendars?.find(
        (cal) => cal.calendarId === calendarId
      );

      if (!calendarInfo) {
        return {
          queryKey: ['calendarEvents', calendarId, targetYear, targetMonth],
          queryFn: () =>
            Promise.resolve<CalendarEventsDTO>({ calendarId, eventDtos: [] }),
          enabled: false,
        };
      }

      return {
        queryKey: ['calendarEvents', calendarId, targetYear, targetMonth],
        queryFn: async () => {
          const response = await calendarService.getCalendarEvents({
            calendarId,
            calendarType: calendarInfo.calendarType,
            targetUserId:
              calendarInfo.calendarType === 'MEMBER'
                ? calendarInfo.typeId
                : undefined,
            targetYear,
            targetMonth,
          });

          return response.result;
        },
      };
    }),
  });
};
