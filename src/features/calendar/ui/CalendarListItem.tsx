import { useCalendarStore } from '@/features/calendar/model/useCalendarStore';
import { Checkbox } from '@/shared/ui/shadcn/Checkbox';
import { Label } from '@/shared/ui/shadcn/Label';

import { calendarColors } from '../model/constants';

interface CalendarListItemProps {
  calendarId: number | undefined;
  calendarName: string | undefined;
}

export const CalendarListItem = ({
  calendarId,
  calendarName,
}: CalendarListItemProps) => {
  const toggleCalendar = useCalendarStore((state) => state.toggleCalendar);
  const checkedCalendarIds = useCalendarStore(
    (state) => state.checkedCalendarIds
  );

  if (calendarId === undefined || calendarName === undefined) return null;

  const isChecked = checkedCalendarIds.includes(calendarId);

  const handleCheckedChange = () => {
    toggleCalendar(calendarId);
  };

  const color = calendarColors[calendarId];

  return (
    <div className='flex items-center gap-x-2'>
      <Checkbox
        id={calendarId?.toString()}
        className='rounded-full'
        checked={isChecked}
        onCheckedChange={handleCheckedChange}
        style={{ backgroundColor: color, borderColor: color }}
      />
      <Label htmlFor={calendarId?.toString()} className='font-normal'>
        {calendarName}
      </Label>
    </div>
  );
};
