import { cn } from '@/shared/lib/utils';
import { Checkbox } from '@/shared/ui/shadcn/Checkbox';
import { Label } from '@/shared/ui/shadcn/Label';

interface CheckboxWithLabelProps {
  checkboxProps: React.ComponentProps<typeof Checkbox>;
  labelProps: React.ComponentProps<typeof Label>;
  wrapperClassName?: string;
}

export const CheckboxWithLabel = ({
  checkboxProps,
  labelProps,
  wrapperClassName = undefined,
}: CheckboxWithLabelProps) => {
  return (
    <div className={cn(`flex items-center space-x-2`, wrapperClassName)}>
      <Checkbox {...checkboxProps} className={cn(checkboxProps?.className)} />
      <Label
        {...labelProps}
        className={cn(`font-normal`, labelProps?.className)}
      />
    </div>
  );
};
