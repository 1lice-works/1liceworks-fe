import { useQuery } from '@tanstack/react-query';
import { CalendarDays } from 'lucide-react';
import { useEffect } from 'react';

import { CalendarListDTO } from '@/features/calendar/api/dto';
import { calendarQueries } from '@/features/calendar/api/queries';
import { useCalendarStore } from '@/features/calendar/model/useCalendarStore';
import { CalendarListItem } from '@/features/calendar/ui/CalendarListItem';
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

  const setInitialCalendars = useCalendarStore(
    (state) => state.setInitialCalendars
  );

  useEffect(() => {
    if (calendars) {
      setInitialCalendars(calendars);
    }
  }, [calendars, setInitialCalendars]);

  const myCalendar =
    calendars?.find((calendar) => calendar.isMyCalendar) || null;

  const teamCalendar =
    calendars?.find((calendar) => calendar.calendarType === 'TEAM') || null;

  const otherCalendars =
    calendars?.filter(
      (calendar) => !calendar.isMyCalendar && calendar.calendarType !== 'TEAM'
    ) || [];

  const calendarSections = [
    {
      id: 'item-1',
      title: 'My Calendar',
      items: myCalendar ? [myCalendar] : [],
    },
    {
      id: 'item-2',
      title: 'Team Calendar',
      items: teamCalendar ? [teamCalendar] : [],
    },
    {
      id: 'item-3',
      title: 'Other Calendars',
      items: otherCalendars,
    },
  ];

  return (
    <Accordion type='multiple' className='w-full'>
      {calendarSections.map((section) => (
        <AccordionItem key={section.id} value={section.id}>
          <AccordionTrigger>
            <div className={cn(`flex items-center gap-x-2`)}>
              <CalendarDays className='size-4' />
              {section.title}
            </div>
          </AccordionTrigger>
          {section.items.map((calendar) => (
            <AccordionContent key={calendar.calendarId}>
              <CalendarListItem
                calendarId={calendar.calendarId}
                calendarName={calendar.name}
              />
            </AccordionContent>
          ))}
        </AccordionItem>
      ))}
    </Accordion>
  );
};
