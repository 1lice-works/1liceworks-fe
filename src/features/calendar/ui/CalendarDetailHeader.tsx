import { InputWithButton } from '@/shared/ui/custom/InputWithButton';
import { Button } from '@/shared/ui/shadcn/Button';

export const CalendarDetailHeader = () => {
  return (
    <div className='flex gap-2 pb-4'>
      <InputWithButton
        inputProps={{
          type: 'text',
          placeholder: '제목',
          className: 'w-full',
        }}
        buttonProps={{ children: '저장' }}
      />
      <Button variant='outline'>취소</Button>
    </div>
  );
};
