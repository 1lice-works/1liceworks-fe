import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/shadcn/Button';
import { Input } from '@/shared/ui/shadcn/Input';

interface InputWithButtonProps {
  inputProps: React.ComponentProps<typeof Input>;
  buttonProps: React.ComponentProps<typeof Button>;
  wrapperClassName?: string;
}

export function InputWithButton({
  inputProps,
  buttonProps,
  wrapperClassName = undefined,
}: InputWithButtonProps) {
  return (
    <div
      className={cn(
        `flex w-full max-w-sm items-center space-x-2`,
        wrapperClassName
      )}
    >
      <Input {...inputProps} className={cn(inputProps?.className)} />
      <Button {...buttonProps} className={cn(buttonProps?.className)} />
    </div>
  );
}
