import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { CalendarDTO } from '@/features/calendar/api/dto';

interface CalendarStore {
  checkedCalendarIds: number[]; // 체크된 캘린더들의 ID 저장
  toggleCalendar: (calendarId: number | undefined) => void; // 캘린더 체크 상태 토글 함수
  isCalendarChecked: (calendarId: number) => boolean; // 특정 캘린더의 체크여부 확인 함수
  setInitialCalendars: (calendarIds: CalendarDTO[]) => void; // 초기 캘린더 목록 설정 함수
  reset: () => void;
}

export const useCalendarStore = create<CalendarStore>()(
  persist(
    (set, get) => ({
      checkedCalendarIds: [],

      toggleCalendar: (calendarId: number | undefined) => {
        if (calendarId === undefined) return;

        const { checkedCalendarIds } = get();

        if (checkedCalendarIds.includes(calendarId)) {
          set({
            checkedCalendarIds: checkedCalendarIds.filter(
              (id) => id !== calendarId
            ),
          });
        } else {
          set({
            checkedCalendarIds: [...checkedCalendarIds, calendarId],
          });
        }
      },

      isCalendarChecked: (calendarId: number) => {
        return get().checkedCalendarIds.includes(calendarId);
      },

      setInitialCalendars: (calendars: CalendarDTO[]) => {
        if (get().checkedCalendarIds.length === 0) {
          const calendarIds = calendars.map((calendar) => calendar.calendarId);
          set({ checkedCalendarIds: calendarIds });
        }
      },

      reset: () => {
        set({ checkedCalendarIds: [] });
      },
    }),
    {
      name: 'calendar-storage',
    }
  )
);
