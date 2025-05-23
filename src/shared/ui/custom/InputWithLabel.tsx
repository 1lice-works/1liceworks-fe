import { cn } from '@/shared/lib/utils';
import { Input } from '@/shared/ui/shadcn/Input';
import { Label } from '@/shared/ui/shadcn/Label';

interface InputWithLabelProps {
  inputProps: React.ComponentProps<typeof Input>;
  labelProps: React.ComponentProps<typeof Label>;
  wrapperClassName?: string;
}

export const InputWithLabel = ({
  inputProps,
  labelProps,
  wrapperClassName = undefined,
}: InputWithLabelProps) => {
  return (
    <div
      className={cn(
        `grid w-full max-w-sm items-center gap-1.5`,
        wrapperClassName
      )}
    >
      <Label {...labelProps} className={cn(labelProps?.className)} />
      <Input {...inputProps} className={cn(inputProps?.className)} />
    </div>
  );
};
