import { CalendarSync, ChevronLeft, ChevronRight } from 'lucide-react';
import { NavigateAction, Views } from 'react-big-calendar';

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

export const CustomToolbar = ({
  date,
  onNavigate,
  onView,
  view,
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
              {Views.MONTH && <SelectItem value='month'>월</SelectItem>}
              {Views.WEEK && <SelectItem value='week'>주</SelectItem>}
              {Views.DAY && <SelectItem value='day'>일</SelectItem>}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
