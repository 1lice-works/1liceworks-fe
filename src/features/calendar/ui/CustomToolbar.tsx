import { ChevronLeft, ChevronRight } from 'lucide-react';
import { NavigateAction } from 'react-big-calendar';

import { SimpleCalendarIcon } from '@/shared/icons/SimpleCalendarIcon';
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

export function CustomToolbar({
  date,
  onNavigate,
  onView,
  view,
  views,
  // localizer,
}: ToolbarTypes) {
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

  // 현재 년도와 월을 'YYYY년 MM월' 형식으로 표시
  const formattedDate = `${date.getFullYear()}년 ${date.getMonth() + 1}월`;

  // views 객체에서 keys를 가져와 확인
  const viewsKeys = Object.values(views);
  console.log(viewsKeys, typeof viewsKeys);

  return (
    <div className='mb-2 flex w-full items-center justify-between gap-2'>
      <div className='flex items-center gap-2'>
        <Button
          className='flex rounded-2xl'
          variant='outline'
          type='button'
          onClick={handleTodayClick}
        >
          <SimpleCalendarIcon />
          <p>오늘</p>
        </Button>
        <Button type='button' variant='ghost' onClick={handlePrevClick}>
          <ChevronLeft size={25} className='font-semibold' />
        </Button>
        <Button type='button' variant='ghost' onClick={handleNextClick}>
          <ChevronRight />
        </Button>
        <span className='text-xl'>{formattedDate}</span>
      </div>
      <Select value={view} onValueChange={onView}>
        <SelectTrigger className='flex w-fit gap-2'>
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
  );
}
