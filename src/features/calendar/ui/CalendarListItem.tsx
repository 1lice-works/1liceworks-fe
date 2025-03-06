import { useCalendarStore } from '@/features/calendar/model/useCalendarStore';
import { Checkbox } from '@/shared/ui/shadcn/Checkbox';
import { Label } from '@/shared/ui/shadcn/Label';

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

  const handleCheckedChange = (checked: boolean) => {
    toggleCalendar(calendarId);
    console.log(
      `Calendar ${calendarName} (ID: ${calendarId}) is now ${checked ? 'checked' : 'unchecked'}`
    );
  };

  return (
    <div className='flex items-center gap-x-2'>
      {/* TODO) calendarId에 따라 Checkbox border, background color 적용 */}
      <Checkbox
        id={calendarId?.toString()}
        className='rounded-full'
        checked={isChecked}
        onCheckedChange={handleCheckedChange}
      />
      <Label htmlFor={calendarId?.toString()} className='font-normal'>
        {calendarName}
      </Label>
    </div>
  );
};
