import { HTMLInputTypeAttribute } from 'react';
import { useFormContext } from 'react-hook-form';

import { Button } from '@/shared/ui/button';
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/shared/ui/form';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';

interface RHFMailInputProps {
  name: string;
  label: string;
  placeholder: string;
  type?: HTMLInputTypeAttribute;
}

export function RHFMailInput({
  name,
  label,
  placeholder,
  type,
}: RHFMailInputProps) {
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
            <Button>인증</Button>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
