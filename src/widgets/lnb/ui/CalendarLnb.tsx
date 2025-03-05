import { useQuery } from '@tanstack/react-query';
import { ArrowUp, CalendarDays, Plus } from 'lucide-react';

import { CalendarListDTO } from '@/features/calendar/api/dto';
import { calendarQueries } from '@/features/calendar/api/queries';
import { cn } from '@/shared/lib/utils';
import { InputWithButton } from '@/shared/ui/custom/InputWithButton';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/shared/ui/shadcn/Accordion';
import { Button } from '@/shared/ui/shadcn/Button';
import { Calendar } from '@/shared/ui/shadcn/Calendar';

export const CalendarLnb = () => {
  const { data } = useQuery<CalendarListDTO>({
    ...calendarQueries.getCalendars,
  });

  console.log('내가 조회 가능한 모든 캘린더', data);

  return (
    <div className='flex h-full flex-col gap-y-4 border-r p-4'>
      <Button
        variant='outline'
        size='lg'
        className={cn(`h-0 w-fit rounded-xl py-6`)}
      >
        <Plus />
        <p>만들기</p>
      </Button>

      <Calendar className={cn(`rounded-md border`)} />

      <InputWithButton
        inputProps={{
          placeholder: '작성한 대로 일정을 생성해 드릴게요.',
          className: 'pr-9',
        }}
        buttonProps={{
          children: <ArrowUp size={16} />,
          size: 'sm',
          className: cn(
            `rounded-full absolute inset-y-0 right-3 my-auto p-0 size-5`
          ),
        }}
        wrapperClassName={cn(`relative space-x-0`)}
      />

      <div>
        <Accordion type='multiple' className='w-full'>
          <AccordionItem value='item-1'>
            <AccordionTrigger>
              <div className={cn(`flex items-center gap-x-2`)}>
                <CalendarDays className='size-4' />
                My Calendar
              </div>
            </AccordionTrigger>
            <AccordionContent>내 캘린더</AccordionContent>
          </AccordionItem>
          <AccordionItem value='item-2'>
            <AccordionTrigger>
              <div className={cn(`flex items-center gap-x-2`)}>
                <CalendarDays className='size-4' />
                Team Calendar
              </div>
            </AccordionTrigger>
            <AccordionContent>팀 캘린더</AccordionContent>
          </AccordionItem>
          <AccordionItem value='item-3'>
            <AccordionTrigger>
              <div className={cn(`flex items-center gap-x-2`)}>
                <CalendarDays className='size-4' />
                Other Calendars
              </div>
            </AccordionTrigger>
            <AccordionContent>정경준/대리</AccordionContent>
            <AccordionContent>정태승/주임</AccordionContent>
            <AccordionContent>명광호/사원</AccordionContent>
            <AccordionContent>엄수경/사원</AccordionContent>
            <AccordionContent>대한민국 법정 공휴일</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};
