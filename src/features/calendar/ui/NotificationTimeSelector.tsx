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

interface NotificationTimeSelectorProps {
  id: number;
  onRemove: (id: number) => void;
}

export const NotificationTimeSelector = ({
  id,
  onRemove,
}: NotificationTimeSelectorProps) => {
  return (
    <div className='flex items-center gap-x-1.5'>
      <Input type='number' min={0} defaultValue={10} placeholder='시간' />

      <Select defaultValue='minute'>
        <SelectTrigger>
          <SelectValue placeholder='단위' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='minute'>분</SelectItem>
          <SelectItem value='hour'>시간</SelectItem>
          <SelectItem value='day'>일</SelectItem>
          <SelectItem value='week'>주</SelectItem>
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
