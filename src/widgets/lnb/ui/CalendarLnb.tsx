import { ArrowUp, Plus } from 'lucide-react';

import { CalendarList } from '@/features/calendar/ui/CalendarList';
import { cn } from '@/shared/lib/utils';
import { InputWithButton } from '@/shared/ui/custom/InputWithButton';
import { Button } from '@/shared/ui/shadcn/Button';
import { Calendar } from '@/shared/ui/shadcn/Calendar';

export const CalendarLnb = () => {
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

      <CalendarList />
    </div>
  );
};
