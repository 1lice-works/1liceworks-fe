import { CalendarSync, ChevronLeft, ChevronRight } from 'lucide-react';
import { NavigateAction } from 'react-big-calendar';

import { Button } from '@/shared/ui/shadcn/Button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/shadcn/Select';

import { ToolbarTypes } from '../model/eventTypes';

// interface ToolbarTypes {
//   date: Date;
//   onNavigate: (navigate: NavigateAction, date?: Date | undefined) => void;
//   onView: (view: View) => void;
//   view: View;
//   views: ViewsProps<{ calendarId: number; id: number; title: string; start: Date; end: Date; }, object>
// }

export const CustomToolbar = ({
  date,
  onNavigate,
  onView,
  view,
  views,
  // localizer,
}: ToolbarTypes) => {
  const navigate = (action: NavigateAction) => {
    onNavigate(action);
  };

  const handleTodayClick = () => {
    navigate('TODAY');
  };

  const handlePrevClick = () => {
    navigate('PREV');
  };

  const handleNextClick = () => {
    navigate('NEXT');
  };

  const formattedDate =
    view === 'day'
      ? `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`
      : `${date.getFullYear()}년 ${date.getMonth() + 1}월`;

  // views 객체에서 keys를 가져와 확인
  const viewsKeys = Object.values(views);
  // console.log(viewsKeys, typeof viewsKeys);

  return (
    <div className='flex w-full items-center gap-2 pb-4'>
      <div className='flex grow items-center justify-start gap-2'>
        <Button
          className='rounded-2xl'
          variant='outline'
          type='button'
          onClick={handleTodayClick}
        >
          <CalendarSync />
          오늘
        </Button>

        <div>
          <Button
            type='button'
            variant='ghost'
            size='icon'
            onClick={handlePrevClick}
          >
            <ChevronLeft />
          </Button>
          <Button
            type='button'
            variant='ghost'
            size='icon'
            onClick={handleNextClick}
          >
            <ChevronRight />
          </Button>
        </div>

        <p className='text-xl'>{formattedDate}</p>
      </div>

      <div className='shrink-0'>
        <Select value={view} onValueChange={onView}>
          <SelectTrigger className='flex w-fit gap-2 rounded-2xl'>
            <SelectValue defaultValue={'month'} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {viewsKeys.includes('month') && (
                <SelectItem value='month'>월</SelectItem>
              )}
              {viewsKeys.includes('week') && (
                <SelectItem value='week'>주</SelectItem>
              )}
              {viewsKeys.includes('day') && (
                <SelectItem value='day'>일</SelectItem>
              )}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
