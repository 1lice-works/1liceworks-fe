import { useMutation, useQueries, useQueryClient } from '@tanstack/react-query';

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
            Promise.resolve<CalendarEventsDTO>({
              calendarId,
              calendarType: 'MEMBER',
              isMyCalendar: true,
              eventDtos: [],
            }),
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

          const calendarEventsWithInfo: CalendarEventsDTO = {
            ...response.result,
            calendarType: calendarInfo.calendarType,
            isMyCalendar: calendarInfo.isMyCalendar,
          };

          return calendarEventsWithInfo;
        },
      };
    }),
  });
};

export const EventMutations = {
  // 내 캘린더 일정 생성
  useCreateMyEvent: () => {},

  // 팀 캘린더 일정 생성
  useCreateTeamEvent: () => {},

  // 내 캘린더 일정 수정
  useUpdateMyEvent: () => {},

  // 팀 캘린더 일정 수정
  useUpdateTeamEvent: () => {},

  // 내 캘린더 일정 삭제
  useDeleteMyEvent: () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: (eventId: number) => calendarService.deleteMyEvent(eventId),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['calendarEvents'] });
      },
    });
  },

  // 팀 캘린더 일정 삭제
  useDeleteTeamEvent: () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: ({
        calendarId,
        eventId,
      }: {
        calendarId: number;
        eventId: number;
      }) => calendarService.deleteTeamEvent(calendarId, eventId),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['calendarEvents'] });
      },
    });
  },
};
