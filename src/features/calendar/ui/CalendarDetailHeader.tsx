import { InputWithButton } from '@/shared/ui/InputWithButton';

export const CalendarDetailHeader = () => {
  return (
    <div>
      <InputWithButton
        inputProps={{ type: 'text', placeholder: '제목' }}
        buttonProps={{}}
      />
    </div>
  );
};
