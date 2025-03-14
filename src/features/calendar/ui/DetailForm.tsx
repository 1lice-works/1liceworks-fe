import { useForm } from 'react-hook-form';

import { CalendarEventItem } from '@/features/calendar/model/types';
import { RHFInput } from '@/shared/ui/custom/RHFInput';
import { RHFSelect } from '@/shared/ui/custom/RHFSelect';
import { RHFTextArea } from '@/shared/ui/custom/RHFTextArea';
import { Button } from '@/shared/ui/shadcn/Button';
import { Checkbox } from '@/shared/ui/shadcn/Checkbox';
import { Form } from '@/shared/ui/shadcn/Form';
import { Label } from '@/shared/ui/shadcn/Label';

interface DetailFormProps {
  setIsEdit: (props: boolean) => void;
  event: CalendarEventItem;
}

export const DetailForm = ({ event, setIsEdit }: DetailFormProps) => {
  const form = useForm({
    mode: 'onChange',
    // resolver: zodResolver(eventsSchema),
  });
  console.log(event);

  return (
    <Form {...form}>
      <form
        className='flex w-full flex-col gap-6'
        onSubmit={form.handleSubmit((e) => console.log('일정 요청 데이터:', e))}
      >
        <div className='flex gap-2'>
          <RHFInput name='title' placeholder={event.title} type='text' />
          <Button type='submit'>저장</Button>
          <Button
            type='button'
            onClick={() => setIsEdit(false)}
            variant='outline'
          >
            취소
          </Button>
        </div>
        <div className='flex gap-2'>
          <div className='flex items-end gap-1'>
            <RHFInput label='시작일' name='start' type='date' placeholder='' />
            <RHFInput name='startTime' type='time' placeholder='' />
          </div>
          <div className='bg-accent-foreground h-[2px] w-1 self-center' />
          <div className='flex items-end gap-1'>
            <RHFInput label='종료일' name='start' type='date' placeholder='' />
            <RHFInput name='endTime' type='time' placeholder='' />
          </div>
          <Label className='flex items-center gap-2'>
            <Checkbox />
            <p className='text-sm'>종일</p>
          </Label>
        </div>
        <div className='flex items-end gap-4'>
          <RHFSelect
            name='calendar'
            label='추가할 캘리더'
            placeholder='내 캘린더'
            items={[
              { value: 'teamCalendar', item: '팀 캘린더' },
              { value: 'myCalendar', item: '내 캘린더' },
            ]}
          />
          <div className='flex items-end gap-2'>
            <RHFSelect
              label='공개 범위 설정'
              name='release'
              placeholder='공개'
              items={[
                { value: 'global', item: '공개' },
                { value: 'private', item: '비공개' },
              ]}
            />
            <RHFSelect
              name='statue'
              placeholder='바쁨'
              items={[
                { value: 'busy', item: '바쁨' },
                { value: 'empty', item: '자리비움' },
              ]}
            />
          </div>
        </div>
        <RHFTextArea
          placeholder='설명 추가'
          label='Description'
          name='description'
        />
      </form>
    </Form>
  );
};
