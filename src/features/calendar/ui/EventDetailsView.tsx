import { useQuery } from '@tanstack/react-query';
import { AlarmClock, Calendar, CalendarClock, EyeIcon } from 'lucide-react';

import { MinimalUserProfileDTO } from '@/features/auth/api/dto';
import { authQueries } from '@/features/auth/api/queries';
import { CalendarEventItem } from '@/features/calendar/model/types';
import {
  formatDate,
  formatDateTime,
  formatTime,
  isSameDate,
} from '@/shared/lib/dayjs';
import { Button } from '@/shared/ui/shadcn/Button';

interface EventDetailsViewProps {
  event: CalendarEventItem;
  setIsEdit: (value: boolean) => void;
}

export const EventDetailsView = ({
  event,
  setIsEdit,
}: EventDetailsViewProps) => {
  const { data: minimalProfile } = useQuery<MinimalUserProfileDTO>(
    authQueries.getMyMinimalProfile
  );

  // TODO) 삭제 API 호출, 호출 성공시 캘린더 페이지로 이동
  const handleDelete = () => {};

  // calendarID === 1 내 캘린더
  // calendarID === 2 내 캘린더
  // calendarID === 3 팀원/직급 캘린더

  // calendarId에 따른 캘린더 이름 매핑
  const getCalendarName = (calendarId: number) => {
    const calendarMap: Record<number, string> = {
      1: '내 캘린더',
      2: '팀 캘린더',
      3: '정경준 / 직급 캘린더',
    };

    return calendarMap[calendarId] || '알 수 없는 캘린더'; // 기본값 처리
  };

  return (
    <div className='flex w-full flex-col gap-4'>
      <div className='flex items-center justify-between'>
        <p className='text-xl font-semibold'>{event.title}</p>
        <div className='flex gap-x-2'>
          {/* 내 캘린더 또는 팀 캘린더의 일정만 수정 가능 */}
          {(event.isMyCalendar || event.calendarType === 'TEAM') && (
            <Button onClick={() => setIsEdit(true)}>수정</Button>
          )}

          {/* 내 캘린더 일정 삭제 가능, 팀장만이 팀 캘린더 일정 삭제 가능 */}
          {(event.isMyCalendar ||
            (event.calendarType === 'TEAM' &&
              minimalProfile?.role === 'LEADER')) && (
            <Button variant='destructive' onClick={handleDelete}>
              삭제
            </Button>
          )}
        </div>
      </div>

      {/* 기간 */}
      <div className='flex items-center gap-2'>
        <CalendarClock />
        {isSameDate(event.start, event.end) ? (
          event.allDay ? (
            <p>{formatDate(event.start)}</p>
          ) : (
            <p>{`${formatDateTime(event.start)} - ${formatTime(event.end)}`}</p>
          )
        ) : event.allDay ? (
          <p>{`${formatDate(event.start)} - ${formatDate(event.end)}`}</p>
        ) : (
          <p>{`${formatDateTime(event.start)} - ${formatDateTime(event.end)}`}</p>
        )}
      </div>

      {/* 알림 */}
      <div className='flex items-center gap-2'>
        <AlarmClock />
        <p>10분전</p>
      </div>

      {/* 이 일정이 추가된 캘린더 */}
      <div className='flex items-center gap-2'>
        <Calendar />
        <p>{getCalendarName(event.calendarId)}</p>
      </div>

      {/* 공개 범위 */}
      <div className='flex items-center gap-2'>
        <EyeIcon />
        <span>공개</span>
        <span>바쁨</span>
      </div>
    </div>
  );
};
