import { HTMLInputTypeAttribute, ReactNode } from 'react';
import { useFormContext } from 'react-hook-form';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from '../shadcn/Form';
import { Label } from '../shadcn/Label';
import { Textarea } from '../shadcn/Textarea';

interface RHFInputProps {
  name: string;
  label?: string;
  placeholder: string;
  description?: string;
  type?: HTMLInputTypeAttribute;
  rightElement?: ReactNode | null;
  error?: boolean;
}

export function RHFTextArea({
  name,
  label,
  placeholder,
  description,
  error = false,
}: RHFInputProps) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className='w-full'>
          {label && (
            <div className='flex w-full items-center'>
              <Label className='font-semibold'>{label}</Label>
            </div>
          )}
          <FormControl>
            <Textarea
              className={`mb-0 w-full`}
              placeholder={placeholder}
              {...field}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          {error && <FormMessage />}
        </FormItem>
      )}
    />
  );
}
