import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { CalendarEventItem } from '@/features/calendar/model/types';
import MultipleSelector, { Option } from '@/shared/ui/custom/MultipleSelector';
import { Button } from '@/shared/ui/shadcn/Button';
import { Checkbox } from '@/shared/ui/shadcn/Checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/ui/shadcn/Form';
import { Input } from '@/shared/ui/shadcn/Input';
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
import { eventSchema } from '../model/eventSchema';
import { FindEmptyTime } from './FindEmptyTime';
import { NotificationTimeSelector } from './NotificationTimeSelector';

interface EventFormProps {
  event: CalendarEventItem;
}

interface Notification {
  id: number;
}

// TODO) 폼 default value를 event 필드 값으로 설정하기
export const EventForm = ({ event }: EventFormProps) => {
  const form = useForm<z.infer<typeof eventSchema>>({
    resolver: zodResolver(eventSchema),
    // defaultValues: {
    //   title: event.title,
    //   startDate: event.start.toDateString(),
    // },
  });

  const onSubmit = (data: z.infer<typeof eventSchema>) => console.log(data);

  const allDay = form.watch('allDay');

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

  const EVENT_CALENDAR_OPTIONS = useMemo(() => {
    if (!calendars) return [];

    return calendars
      .filter(
        (calendar) => calendar.isMyCalendar || calendar.calendarType === 'TEAM'
      )
      .map((calendar) => ({
        id: calendar.calendarId,
        label: calendar.name,
        value: calendar.calendarId.toString(),
        isTeamCalendar: calendar.calendarType === 'TEAM',
      }));
  }, [calendars]);

  const selectedCalendarId = form.watch('selectedCalendarId');
  const isTeamEvent = EVENT_CALENDAR_OPTIONS.some(
    (cal) => cal.value === selectedCalendarId && cal.isTeamCalendar
  );

  const PARTICIPANTS: Option[] = useMemo(() => {
    if (!calendars) return [];

    return calendars
      .filter((calendar) => calendar.calendarType === 'MEMBER')
      .map((calendar) => ({
        label: calendar.name,
        value: calendar.typeId.toString(), // userId
      }));
  }, [calendars]);

  return (
    <div className='flex h-full w-full gap-x-4 text-sm'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='flex grow flex-col gap-y-6'
        >
          {/* 제목, 버튼 */}
          <div className='flex gap-x-2'>
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem className='grow'>
                  <FormControl>
                    <Input placeholder='제목을 입력하세요.' {...field} />
                  </FormControl>
                  <FormMessage className='text-xs' />
                </FormItem>
              )}
            />
            <Button type='submit'>저장</Button>
            <Button type='button' variant='outline'>
              취소
            </Button>
          </div>

          {/* 기간 */}
          <div className='flex gap-x-4'>
            <div className='flex items-end gap-x-2'>
              <FormField
                control={form.control}
                name='startDate'
                render={({ field }) => (
                  <FormItem className='w-fit'>
                    <FormLabel>시작일</FormLabel>
                    <FormControl>
                      <Input type='date' {...field} />
                    </FormControl>
                    <FormMessage className='text-xs' />
                  </FormItem>
                )}
              />
              {!allDay && (
                <FormField
                  control={form.control}
                  name='startTime'
                  render={({ field }) => (
                    <FormItem className='w-fit'>
                      <FormControl>
                        <Input type='time' {...field} />
                      </FormControl>
                      <FormMessage className='text-xs' />
                    </FormItem>
                  )}
                />
              )}
            </div>

            <div className='flex items-end gap-x-2'>
              <FormField
                control={form.control}
                name='endDate'
                render={({ field }) => (
                  <FormItem className='w-fit'>
                    <FormLabel>종료일</FormLabel>
                    <FormControl>
                      <Input type='date' {...field} />
                    </FormControl>
                    <FormMessage className='text-xs' />
                  </FormItem>
                )}
              />

              {!allDay && (
                <FormField
                  control={form.control}
                  name='endTime'
                  render={({ field }) => (
                    <FormItem className='w-fit'>
                      <FormControl>
                        <Input type='time' {...field} />
                      </FormControl>
                      <FormMessage className='text-xs' />
                    </FormItem>
                  )}
                />
              )}
            </div>

            <FormField
              control={form.control}
              name='allDay'
              render={({ field }) => (
                <FormItem className='flex shrink-0 items-center gap-x-1.5'>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className='leading-none'>종일</FormLabel>
                </FormItem>
              )}
            />
          </div>

          {/* 위치 */}
          <FormField
            control={form.control}
            name='location'
            render={({ field }) => (
              <FormItem className='w-[180px]'>
                <FormLabel>위치</FormLabel>
                <FormControl>
                  <Input placeholder='위치를 작성하세요.' {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          {/* 알림 */}
          <FormField
            control={form.control}
            name='notification'
            render={({ field }) => (
              <FormItem className='w-[180px]'>
                <FormLabel>알림</FormLabel>
                {notifications.map((notification) => (
                  <FormControl>
                    <NotificationTimeSelector
                      key={notification.id}
                      id={notification.id}
                      onRemove={handleRemoveNotification}
                    />
                  </FormControl>
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
              </FormItem>
            )}
          />

          {/* 추가할 캘린더 */}
          <FormField
            control={form.control}
            name='selectedCalendarId'
            render={({ field }) => (
              <FormItem className='w-[180px]'>
                <FormLabel>추가할 캘린더</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue='myCalendar'
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='추가할 캘린더' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {EVENT_CALENDAR_OPTIONS.map((calendar) => (
                      <SelectItem key={calendar.id} value={calendar.value}>
                        {calendar.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          {/* 공개 범위 설정 */}
          <div className='flex w-[180px] items-end gap-x-2'>
            <FormField
              control={form.control}
              name='privacyType'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>공개 범위</FormLabel>
                  <Select
                    defaultValue='public'
                    disabled={isTeamEvent}
                    onValueChange={field.onChange}
                  >
                    <FormControl>
                      <SelectTrigger disabled={isTeamEvent}>
                        <SelectValue placeholder='공개 범위' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='public'>공개</SelectItem>
                      <SelectItem value='private'>비공개</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='availability'
              render={({ field }) => (
                <FormItem>
                  <Select
                    defaultValue='busy'
                    disabled={isTeamEvent}
                    onValueChange={field.onChange}
                  >
                    <FormControl>
                      <SelectTrigger disabled={isTeamEvent}>
                        <SelectValue placeholder='표시될 상태' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='busy'>바쁨</SelectItem>
                      <SelectItem value='free'>한가함</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>

          {/* 참석자 */}
          {isTeamEvent && (
            <FormField
              control={form.control}
              name='participants'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>참석자</FormLabel>
                  <FormControl>
                    <MultipleSelector
                      onChange={field.onChange}
                      defaultOptions={PARTICIPANTS}
                      placeholder='참석자를 선택하세요.'
                      hidePlaceholderWhenSelected={true}
                      emptyIndicator={
                        <p className='text-center leading-10'>
                          no results found.
                        </p>
                      }
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          )}

          {/* 설명 */}
          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem>
                <FormLabel>설명</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='설명을 추가하세요.'
                    className='h-30 resize-none'
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>

      {isTeamEvent && <FindEmptyTime />}
    </div>
  );
};
