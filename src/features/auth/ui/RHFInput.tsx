import { HTMLInputTypeAttribute, PropsWithChildren, ReactNode } from 'react';
import { useFormContext } from 'react-hook-form';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from '@/shared/ui/shadcn/Form';
import { Input } from '@/shared/ui/shadcn/Input';
import { Label } from '@/shared/ui/shadcn/Label';

interface RHFInputProps extends PropsWithChildren {
  name: string;
  label?: string;
  placeholder: string;
  description?: string;
  type?: HTMLInputTypeAttribute;
  rightElement?: ReactNode | null;
  error?: boolean;
}

export function RHFInput({
  name,
  label,
  placeholder,
  description,
  rightElement,
  type,
  error = true,
}: RHFInputProps) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className='w-full gap-0'>
          {label && (
            <div className='mb-2 flex w-full items-center'>
              <Label className='font-semibold'>{label}</Label>
            </div>
          )}
          <FormControl>
            <div className='flex w-full gap-2'>
              <Input
                className='flex-1'
                placeholder={placeholder}
                {...field}
                type={type}
              />
              {rightElement && <> {rightElement}</>}
            </div>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          {error && <FormMessage />}
        </FormItem>
      )}
    />
  );
}
