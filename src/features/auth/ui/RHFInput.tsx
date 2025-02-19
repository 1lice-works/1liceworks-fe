import { HTMLInputTypeAttribute } from 'react';
import { useFormContext } from 'react-hook-form';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from '@/shared/ui/form';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';

interface RHFInputProps {
  name: string;
  label: string;
  placeholder: string;
  description?: string;
  type?: HTMLInputTypeAttribute;
}

export function RHFInput({
  name,
  label,
  placeholder,
  description,
  rightElement,
  type,
}: RHFInputProps) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className='flex items-center'>
            <Label>{label}</Label>
          </div>
          <FormControl>
            <Input placeholder={placeholder} {...field} type={type} />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
