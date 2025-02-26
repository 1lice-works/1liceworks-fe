import { HTMLInputTypeAttribute, ReactNode } from 'react';
import { useFormContext } from 'react-hook-form';

import { cn } from '@/shared/lib/utils';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from '../shadcn/Form';
import { Label } from '../shadcn/Label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../shadcn/Select';

interface RHFInputProps {
  name: string;
  label?: string;
  placeholder: string;
  description?: string;
  type?: HTMLInputTypeAttribute;
  rightElement?: ReactNode | null;
  error?: boolean;
  wrapperClassName?: string;
  items: {
    value: string;
    item: string;
  }[];
}

export const RHFSelect = ({
  name,
  label,
  placeholder,
  description,
  error = false,
  items,
  wrapperClassName,
}: RHFInputProps) => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn(wrapperClassName)}>
          {label && (
            <div className='flex items-center'>
              <Label className='font-semibold'>{label}</Label>
            </div>
          )}
          <FormControl>
            <Select
              value={field.value} // 선택된 값을 react-hook-form과 연결
              onValueChange={field.onChange} // 변경된 값을 react-hook-form 상태에 반영
            >
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent className='max-h-[150px]'>
                <SelectGroup>
                  {items.map((item) => (
                    <SelectItem value={item.value}>{item.item}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          {error && <FormMessage />}
        </FormItem>
      )}
    />
  );
};
