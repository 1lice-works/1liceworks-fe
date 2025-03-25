import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';

import { CalendarEventItem } from '@/features/calendar/model/types';
import { FindEmptyTime } from '@/features/calendar/ui/FindEmptyTime';
import { InputWithLabel } from '@/shared/ui/custom/InputWithLabel';
import MultipleSelector, { Option } from '@/shared/ui/custom/MultipleSelector';
import { Button } from '@/shared/ui/shadcn/Button';
import { Checkbox } from '@/shared/ui/shadcn/Checkbox';
import { Input } from '@/shared/ui/shadcn/Input';
import { Label } from '@/shared/ui/shadcn/Label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/shadcn/Select';
import { Textarea } from '@/shared/ui/shadcn/Textarea';

import { CalendarListDTO } from '../api/dto';
import { calendarQueries } from '../api/queries';
import { NotificationTimeSelector } from './NotificationTimeSelector';

interface EventFormProps {
  event: CalendarEventItem;
}

interface Notification {
  id: number;
}

// TODO) 폼 default value를 event 필드 값으로 설정하기
export const EventForm = ({ event }: EventFormProps) => {
  const [allDay, setAllDay] = useState<boolean>(true);

  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 1 },
  ]);
  const MAX_NOTIFICATIONS = 5;

  const handleAddNotification = () => {
    if (notifications.length < MAX_NOTIFICATIONS) {
      setNotifications([...notifications, { id: Date.now() }]);
    }
  };

  const handleRemoveNotification = (idToRemove: number): void => {
    setNotifications(
      notifications.filter((notification) => notification.id !== idToRemove)
    );
  };

  const { data: calendars } = useQuery<CalendarListDTO>({
    ...calendarQueries.getCalendars,
  });

  // calendars에서 isMyCalendar가 true인 값과, calendarType이 TEAM인 값 넣기
  const EVENT_CALENDAR_OPTIONS = useMemo(() => {
    if (!calendars) return [];

    return calendars
      .filter(
        (calendar) => calendar.isMyCalendar || calendar.calendarType === 'TEAM'
      )
      .map((calendar) => ({
        id: calendar.calendarId,
        label: calendar.name,
        value: calendar.isMyCalendar ? 'myCalendar' : 'teamCalendar',
      }));
  }, [calendars]);

  const PARTICIPANTS: Option[] = useMemo(() => {
    if (!calendars) return [];

    return calendars
      .filter((calendar) => calendar.calendarType === 'MEMBER')
      .map((calendar) => ({
        label: calendar.name,
        value: calendar.calendarId.toString(),
      }));
  }, [calendars]);

  return (
    <div className='flex h-full w-full gap-x-4 text-sm'>
      <form className='flex grow flex-col gap-y-6'>
        {/* 제목, 버튼 */}
        <div className='flex gap-x-2'>
          <Input placeholder='제목을 입력하세요.' />
          <Button type='submit'>저장</Button>
          <Button type='button' variant='outline'>
            취소
          </Button>
        </div>

        {/* 기간 */}
        {/* 생성시) 기본 시작일: 오늘, 현재 시각 분 단위 반올림 (18:08 -> 18:10) */}
        {/* 생성시) 기본 종료일: 오늘, 시작 시간 1시간 이후, 시간에 날짜 맞추기. */}
        {/* allDay === True일 경우 시작 시간 00:00, 종료 시간 23:59으로 설정해 폼 제출 */}
        <div className='flex gap-x-4'>
          <div className='grid w-fit gap-1.5'>
            <Label htmlFor='startDate'>시작일</Label>
            <div className='flex gap-x-2'>
              <Input type='date' className='w-fit' id='startDate' />
              {!allDay && <Input type='time' className='w-fit' />}
            </div>
          </div>

          <div className='grid w-fit gap-1.5'>
            <Label htmlFor='endDate'>종료일</Label>
            <div className='flex gap-x-2'>
              <Input type='date' className='w-fit' id='endDate' />
              {!allDay && <Input type='time' className='w-fit' />}
            </div>
          </div>

          <div className='flex shrink-0 items-center gap-x-1.5'>
            <Checkbox
              id='allday'
              checked={allDay}
              onCheckedChange={() => setAllDay(!allDay)}
            />
            <label
              htmlFor='allday'
              className='text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
            >
              종일
            </label>
          </div>
        </div>

        {/* 위치 */}
        <InputWithLabel
          inputProps={{
            id: 'location',
            placeholder: '위치를 작성하세요.',
            className: 'w-[180px]',
          }}
          labelProps={{
            children: '위치',
            htmlFor: 'location',
          }}
        />

        {/* 알림 */}
        <div className='grid w-[180px] gap-1.5'>
          <Label htmlFor='alert'>알림</Label>

          {notifications.map((notification) => (
            <NotificationTimeSelector
              key={notification.id}
              id={notification.id}
              onRemove={handleRemoveNotification}
            />
          ))}

          {notifications.length < MAX_NOTIFICATIONS && (
            <Button
              variant='outline'
              id='alert'
              type='button'
              onClick={handleAddNotification}
            >
              알림 추가
            </Button>
          )}
        </div>

        {/* 추가할 캘린더 */}
        <div className='grid w-full gap-1.5'>
          <Label>추가할 캘린더</Label>

          <Select defaultValue='myCalendar'>
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='추가할 캘린더' />
            </SelectTrigger>
            <SelectContent>
              {EVENT_CALENDAR_OPTIONS.map((calendar) => (
                <SelectItem key={calendar.id} value={calendar.value}>
                  {calendar.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* 공개 범위 설정 */}
        <div className='grid w-[180px] gap-1.5'>
          <Label>공개 범위</Label>

          <div className='flex gap-x-2'>
            <Select defaultValue='public'>
              <SelectTrigger>
                <SelectValue placeholder='공개 범위' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='public'>공개</SelectItem>
                <SelectItem value='private'>비공개</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue='busy'>
              <SelectTrigger>
                <SelectValue placeholder='표시될 상태' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='busy'>바쁨</SelectItem>
                <SelectItem value='free'>한가함</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* 참석자 */}
        {event.calendarType === 'TEAM' && (
          <div className='grid w-full gap-1.5'>
            <Label>참석자</Label>

            <MultipleSelector
              defaultOptions={PARTICIPANTS}
              placeholder='참석자를 선택하세요.'
              hidePlaceholderWhenSelected={true}
              emptyIndicator={
                <p className='text-center leading-10'>no results found.</p>
              }
            />
          </div>
        )}

        {/* 설명 */}
        <div className='grid w-full gap-1.5'>
          <Label htmlFor='description'>설명</Label>
          <Textarea
            id='description'
            placeholder='설명을 추가하세요.'
            className='h-30 resize-none'
          />
        </div>
      </form>

      {event.calendarType === 'TEAM' && <FindEmptyTime />}
    </div>
  );
};
