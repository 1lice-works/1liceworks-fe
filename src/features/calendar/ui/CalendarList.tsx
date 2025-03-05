import { useQuery } from '@tanstack/react-query';
import { CalendarDays } from 'lucide-react';

import { CalendarListDTO } from '@/features/calendar/api/dto';
import { calendarQueries } from '@/features/calendar/api/queries';
import { cn } from '@/shared/lib/utils';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/shared/ui/shadcn/Accordion';

export const CalendarList = () => {
  const { data } = useQuery<CalendarListDTO>({
    ...calendarQueries.getCalendars,
  });

  console.log('내가 조회 가능한 모든 캘린더', data);

  return (
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
  );
};
