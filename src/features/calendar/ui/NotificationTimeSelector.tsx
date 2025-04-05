import { X } from 'lucide-react';

import { Button } from '@/shared/ui/shadcn/Button';
import { Input } from '@/shared/ui/shadcn/Input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/shadcn/Select';

export type NotificationUnit = 'minutes' | 'hours' | 'days' | 'weeks';

interface NotificationTimeSelectorProps {
  id: number;
  value: {
    time: number;
    unit: NotificationUnit;
  };
  onChange: (
    id: number,
    value: { time: number; unit: NotificationUnit }
  ) => void;
  onRemove: (id: number) => void;
}

export const NotificationTimeSelector = ({
  id,
  value,
  onChange,
  onRemove,
}: NotificationTimeSelectorProps) => {
  return (
    <div className='flex items-center gap-x-1.5'>
      <Input
        type='number'
        placeholder='시간'
        value={value.time}
        min={0}
        max={1000}
        onChange={(e) =>
          onChange(id, { ...value, time: Number(e.target.value) || 0 })
        }
      />

      <Select
        defaultValue='minute'
        value={value.unit}
        onValueChange={(unit: string) => {
          if (
            unit === 'minutes' ||
            unit === 'hours' ||
            unit === 'days' ||
            unit === 'weeks'
          ) {
            onChange(id, { ...value, unit });
          }
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder='단위' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='minutes'>분</SelectItem>
          <SelectItem value='hours'>시간</SelectItem>
          <SelectItem value='days'>일</SelectItem>
          <SelectItem value='weeks'>주</SelectItem>
        </SelectContent>
      </Select>

      <Button
        variant='ghost'
        size='icon'
        type='button'
        className='h-fit'
        onClick={() => onRemove(id)}
      >
        <X />
      </Button>
    </div>
  );
};
