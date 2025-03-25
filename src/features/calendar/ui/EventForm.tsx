import { useState } from 'react';

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
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/shadcn/Select';
import { Textarea } from '@/shared/ui/shadcn/Textarea';

import { NotificationTimeSelector } from './NotificationTimeSelector';

interface EventFormProps {
  event: CalendarEventItem;
}

interface Notification {
  id: number;
}

// TODO) 실제 데이터로 대체
// TODO) type이 MEMBER인 캘린더 - label: name, value: 해당 calendarId
const PARTICIPANTS: Option[] = [
  { label: '혜림/직급1', value: '1' },
  { label: '태승/직급2', value: '2' },
  { label: '광호/직급3', value: '3' },
  { label: '수경/직급4', value: '4' },
];

// TODO) 폼 default value를 event 필드 값으로 설정하기
export const EventForm = ({ event }: EventFormProps) => {
  const [allDay, setAllDay] = useState<boolean>(true);

  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 1 },
  ]);
  const MAX_NOTIFICATIONS = 5;

  const handleAddNotification = () => {
    console.log('추가 전', notifications.length);

    if (notifications.length < MAX_NOTIFICATIONS) {
      setNotifications([...notifications, { id: Date.now() }]);
    }

    console.log('추가 후', notifications.length);
  };

  const handleRemoveNotification = (idToRemove: number): void => {
    setNotifications(
      notifications.filter((notification) => notification.id !== idToRemove)
    );
    console.log('삭제 후', notifications.length);
  };

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
              <SelectGroup>
                {/** TODO) 실제 calendar name으로 대체
                 * SelectItem: isMyCalendar가 true인 캘린더, calendar type이 TEAM인 캘린더
                 */}
                <SelectItem value='myCalendar'>내 캘린더</SelectItem>
                <SelectItem value='teamCalendar'>팀 캘린더</SelectItem>
              </SelectGroup>
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
                <SelectGroup>
                  <SelectItem value='public'>공개</SelectItem>
                  <SelectItem value='private'>비공개</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <Select defaultValue='busy'>
              <SelectTrigger>
                <SelectValue placeholder='표시될 상태' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value='busy'>바쁨</SelectItem>
                  <SelectItem value='free'>한가함</SelectItem>
                </SelectGroup>
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
