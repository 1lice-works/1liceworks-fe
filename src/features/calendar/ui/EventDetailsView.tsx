import { useQuery } from '@tanstack/react-query';
import {
  AlarmClock,
  Calendar,
  CalendarClock,
  EyeIcon,
  MapPin,
  Pencil,
  Text,
  Trash2,
  Users,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { MinimalUserProfileDTO } from '@/features/auth/api/dto';
import { authQueries } from '@/features/auth/api/queries';
import { CalendarListDTO } from '@/features/calendar/api/dto';
import { calendarQueries } from '@/features/calendar/api/queries';
import { CalendarEventItem } from '@/features/calendar/model/types';
import {
  getAvailabilityInKorean,
  getPrivacyTypeInKorean,
} from '@/features/calendar/model/utils';
import { ROUTES } from '@/shared/constants/routes';
import {
  formatDate,
  formatDateTime,
  formatTime,
  isSameDate,
} from '@/shared/lib/dayjs';
import { Button } from '@/shared/ui/shadcn/Button';

interface EventDetailsViewProps {
  event: CalendarEventItem;
  isRestrictedEvent: boolean;
}

export const EventDetailsView = ({
  event,
  isRestrictedEvent,
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

  const navigate = useNavigate();

  const handleEditBtnClick = () => {
    navigate(ROUTES.CALENDAR.DETAIL.EVENT(event.eventId.toString()), {
      state: { selectedEvent: event },
    });
  };

  // TODO) 삭제 API 호출, 호출 성공시 캘린더 페이지로 이동
  const handleDelete = () => {};

  return (
    <div className='flex w-full flex-col gap-4 text-sm'>
      {isRestrictedEvent ? (
        <p className='text-lg font-semibold'>
          {getAvailabilityInKorean(event.availability)}
        </p>
      ) : (
        <div className='flex flex-col'>
          <div className='flex w-full justify-end'>
            {/* 내 캘린더 또는 팀 캘린더의 일정만 수정 가능 */}
            {(event.isMyCalendar || event.calendarType === 'TEAM') && (
              <Button variant='ghost' size='icon' onClick={handleEditBtnClick}>
                <Pencil />
              </Button>
            )}

            {/* 내 캘린더 일정 삭제 가능, 팀장만이 팀 캘린더 일정 삭제 가능 */}
            {(event.isMyCalendar ||
              (event.calendarType === 'TEAM' &&
                minimalProfile?.role === 'LEADER')) && (
              <Button variant='ghost' size='icon' onClick={handleDelete}>
                <Trash2 />
              </Button>
            )}
          </div>

          {/* 길이 길어지면 대응 */}
          <p className='text-lg font-semibold'>
            {event.title ? event.title : '(제목 없음)'}
          </p>
        </div>
      )}

      {/* 기간 */}
      <div className='flex items-center gap-2'>
        <CalendarClock size='1rem' className='shrink-0' />
        {isSameDate(event.start, event.end) ? (
          event.allDay ? (
            <p>{formatDate(event.start)}</p>
          ) : (
            <p>{`${formatDate(event.start)} ${formatTime(event.start)} - ${formatTime(event.end)}`}</p>
          )
        ) : event.allDay ? (
          <p>{`${formatDate(event.start)} - ${formatDate(event.end)}`}</p>
        ) : (
          <p>{`${formatDateTime(event.start)} - ${formatDateTime(event.end)}`}</p>
        )}
      </div>

      {!isRestrictedEvent && (
        <>
          {/* 위치 */}
          {event.location && (
            <div className='flex items-center gap-2'>
              <MapPin size='1rem' className='shrink-0' />
              <p>{event.location}</p>
            </div>
          )}

          {/* 참여자 */}
          {/* TODO) 참여자 정보 유무도 조건으로 추가 */}
          {event.calendarType === 'TEAM' && (
            <div className='flex items-center gap-2'>
              <Users size='1rem' className='shrink-0' />
              {/* TODO) event에서 참여자 정보 가져오도록 수정 */}
              <p className='text-muted-foreground'>추가된 참여자가 없습니다.</p>
            </div>
          )}

          {/* 설명 */}
          {event.description && (
            <div className='flex items-center gap-2'>
              <Text size='1rem' className='shrink-0' />
              <p>{event.description}</p>
            </div>
          )}

          {/* 알림 */}
          {/* TODO) 알림 유무도 조건으로 추가 */}
          <div className='flex items-center gap-2'>
            <AlarmClock size='1rem' className='shrink-0' />
            {/* TODO) 백엔드에서 event에 eventReminders 필드 추가하면 반영 */}
            <p className='text-muted-foreground'>추가된 알림이 없습니다.</p>
          </div>

          {/* 공개 범위 */}
          {event.isMyCalendar && (
            <div className='flex items-center gap-2'>
              <EyeIcon size='1rem' className='shrink-0' />
              <p>{getPrivacyTypeInKorean(event.privacyType)}</p>
              <p>{getAvailabilityInKorean(event.availability)}</p>
            </div>
          )}
        </>
      )}

      {/* 이 일정이 추가된 캘린더 */}
      <div className='flex items-center gap-2'>
        <Calendar size='1rem' className='shrink-0' />
        <p>{calendarName}</p>
      </div>
    </div>
  );
};
