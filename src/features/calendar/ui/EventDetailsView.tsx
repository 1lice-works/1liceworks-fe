import { useQuery } from '@tanstack/react-query';
import {
  AlarmClock,
  Calendar,
  CalendarClock,
  EyeIcon,
  Text,
  Users,
} from 'lucide-react';

import { MinimalUserProfileDTO } from '@/features/auth/api/dto';
import { authQueries } from '@/features/auth/api/queries';
import { CalendarListDTO } from '@/features/calendar/api/dto';
import { calendarQueries } from '@/features/calendar/api/queries';
import { CalendarEventItem } from '@/features/calendar/model/types';
import {
  getAvailabilityInKorean,
  getPrivacyTypeInKorean,
} from '@/features/calendar/model/utils';
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

  const { data: calendars } = useQuery<CalendarListDTO>({
    ...calendarQueries.getCalendars,
  });

  const calendarName = calendars?.find(
    (calendar) => calendar.calendarId === event.calendarId
  )?.name;

  // 팀원의 비공개 일정일 경우 제한된 정보만 표시
  const isRestrictedEvent =
    !event.isMyCalendar && event.privacyType === 'PRIVATE';

  // TODO) 삭제 API 호출, 호출 성공시 캘린더 페이지로 이동
  const handleDelete = () => {};

  return (
    <div className='flex w-full flex-col gap-4'>
      {isRestrictedEvent ? (
        <p className='text-xl font-semibold'>
          {getAvailabilityInKorean(event.availability)}
        </p>
      ) : (
        <div className='flex items-center justify-between'>
          <p className='text-xl font-semibold'>
            {event.title ? event.title : '(제목 없음)'}
          </p>

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
      )}

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

      {!isRestrictedEvent && (
        <>
          {/* 설명 */}
          <div className='flex items-center gap-2'>
            <Text />
            <p className={event.description ? '' : 'text-muted-foreground'}>
              {event.description || '상세 내용이 없습니다.'}
            </p>
          </div>

          {/* 알림 */}
          <div className='flex items-center gap-2'>
            <AlarmClock />
            {/* TODO) 백엔드에서 event에 eventReminders 필드 추가하면 반영 */}
            <p className='text-muted-foreground'>추가된 알림이 없습니다.</p>
          </div>

          {/* 공개 범위 */}
          {/* 팀 캘린더의 일정은 항상 공개이므로 이 필드 렌더링하지 않음 */}
          {event.calendarType !== 'TEAM' && (
            <div className='flex items-center gap-2'>
              <EyeIcon />
              <p>{getPrivacyTypeInKorean(event.privacyType)}</p>
              <p>{getAvailabilityInKorean(event.availability)}</p>
            </div>
          )}

          {/* 참여자 */}
          {event.calendarType === 'TEAM' && (
            <div className='flex items-center gap-2'>
              <Users />
              {/* TODO) event에서 참여자 정보 가져오도록 수정 */}
              <p className='text-muted-foreground'>추가된 참여자가 없습니다.</p>
            </div>
          )}
        </>
      )}

      {/* 이 일정이 추가된 캘린더 */}
      <div className='flex items-center gap-2'>
        <Calendar />
        <p>{calendarName}</p>
      </div>
    </div>
  );
};
