import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { CalendarEventItem } from '@/features/calendar/model/types';
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

import { eventSchema } from '../model/eventSchema';
import { NotificationTimeSelector } from './NotificationTimeSelector';

interface EventFormProps {
  event: CalendarEventItem;
}

const MAX_NOTIFICATIONS = 5;

export const EventForm = ({ event }: EventFormProps) => {
  const form = useForm<z.infer<typeof eventSchema>>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: event.title,
      startDate: event.start.toISOString().split('T')[0],
      endDate: event.end.toISOString().split('T')[0],
      startTime: event.allDay
        ? '00:00'
        : event.start.toTimeString().slice(0, 5),
      endTime: event.allDay ? '23:59' : event.end.toTimeString().slice(0, 5),
      allDay: event.allDay,
      location: event.location || '',
      privacyType: 'PUBLIC',
      availability: 'FREE',
      description: event.description || '',
      notification: [{ id: 1, time: 10, unit: 'minutes' }],
    },
  });

  const onSubmit = (data: z.infer<typeof eventSchema>) => console.log(data);
  const onError = (errors: unknown) => console.error('Form errors:', errors);

  const allDay = form.watch('allDay');

  return (
    <div className='flex h-full w-full gap-x-4 text-sm'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, onError)}
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
                      onCheckedChange={(checked) => {
                        field.onChange(checked);
                        if (checked) {
                          form.setValue('startTime', '00:00');
                          form.setValue('endTime', '23:59');
                        }
                      }}
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
            render={({ field }) => {
              // 알림 추가 핸들러
              const handleAddNotification = () => {
                const currentNotifications = field.value || [];
                if (currentNotifications.length < MAX_NOTIFICATIONS) {
                  form.setValue('notification', [
                    ...currentNotifications,
                    { id: Date.now(), time: 10, unit: 'minutes' },
                  ]);
                }
              };

              // 알림 제거 핸들러
              const handleRemoveNotification = (idToRemove: number) => {
                const currentNotifications = field.value || [];
                form.setValue(
                  'notification',
                  currentNotifications.filter(
                    (notification) => notification.id !== idToRemove
                  )
                );
              };

              // 알림 변경 핸들러
              const handleNotificationChange = (
                id: number,
                value: {
                  time: number;
                  unit: 'minutes' | 'hours' | 'days' | 'weeks';
                }
              ) => {
                const currentNotifications = field.value || [];
                form.setValue(
                  'notification',
                  currentNotifications.map((notification) =>
                    notification.id === id
                      ? { ...notification, ...value }
                      : notification
                  )
                );
              };

              // 현재 알림들
              const notifications = field.value || [];

              return (
                <FormItem className='w-[180px]'>
                  <FormLabel>알림</FormLabel>
                  {notifications.map((notification) => (
                    <FormControl key={notification.id}>
                      <NotificationTimeSelector
                        id={notification.id}
                        value={{
                          time: notification.time,
                          unit: notification.unit,
                        }}
                        onChange={handleNotificationChange}
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
              );
            }}
          />

          {/* 공개 범위 설정 */}
          <div className='flex w-[180px] items-end gap-x-2'>
            <FormField
              control={form.control}
              name='privacyType'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>공개 범위</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='공개 범위' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='PUBLIC'>공개</SelectItem>
                      <SelectItem value='PRIVATE'>비공개</SelectItem>
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
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='표시될 상태' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='BUSY'>바쁨</SelectItem>
                      <SelectItem value='FREE'>한가함</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>

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
    </div>
  );
};
