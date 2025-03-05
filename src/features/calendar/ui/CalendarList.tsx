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
  const { data: calendars } = useQuery<CalendarListDTO>({
    ...calendarQueries.getCalendars,
  });

  const teamCalendar =
    calendars?.find((calendar) => calendar.calendarType === 'TEAM') || null;

  const otherCalendars =
    calendars?.filter((calendar) => calendar.calendarType !== 'TEAM') || [];

  // TODO) API 수정되면 myCalendar 추가

  return (
    <Accordion type='multiple' className='w-full'>
      <AccordionItem value='item-1'>
        <AccordionTrigger>
          <div className={cn(`flex items-center gap-x-2`)}>
            <CalendarDays className='size-4' />
            My Calendar
          </div>
        </AccordionTrigger>
        {/* <AccordionContent>{myCalendar?.name}</AccordionContent> */}
      </AccordionItem>

      <AccordionItem value='item-2'>
        <AccordionTrigger>
          <div className={cn(`flex items-center gap-x-2`)}>
            <CalendarDays className='size-4' />
            Team Calendar
          </div>
        </AccordionTrigger>
        <AccordionContent>{teamCalendar?.name}</AccordionContent>
      </AccordionItem>

      <AccordionItem value='item-3'>
        <AccordionTrigger>
          <div className={cn(`flex items-center gap-x-2`)}>
            <CalendarDays className='size-4' />
            Other Calendars
          </div>
        </AccordionTrigger>
        {otherCalendars.map((calendar) => (
          <AccordionContent key={calendar.calendarId}>
            {calendar.name}
          </AccordionContent>
        ))}
      </AccordionItem>
    </Accordion>
  );
};
