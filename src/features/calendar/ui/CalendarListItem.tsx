import { Checkbox } from '@/shared/ui/shadcn/Checkbox';

interface CalendarListItemProps {
  calendarId: number | undefined;
  calendarName: string | undefined;
}

export const CalendarListItem = ({
  calendarId,
  calendarName,
}: CalendarListItemProps) => {
  return (
    <div className='flex items-center gap-x-2'>
      {/* TODO) calendarId에 따라 Checkbox border, background color 적용 */}
      <Checkbox id={calendarId?.toString()} className='rounded-full' />
      <label htmlFor={calendarId?.toString()}>{calendarName}</label>
    </div>
  );
};
