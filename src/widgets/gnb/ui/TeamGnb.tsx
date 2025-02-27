import { User } from 'lucide-react';

import { cn } from '@/shared/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/shadcn/Avatar';
import NotificationIcon from '@/widgets/gnb/ui/assets/bell.svg?react';
import CalendarIcon from '@/widgets/gnb/ui/assets/calendar.svg?react';

import { Logo } from './components/Logo';

const url = '';

export const TeamGnb = () => {
  return (
    <nav className='bg-background-dark flex w-full items-center justify-between gap-x-20 border-b px-8 py-4'>
      <Logo type='team' />

      <div className='flex items-center gap-x-4'>
        <CalendarIcon className='h-8 w-8 cursor-pointer transition duration-200 ease-in-out hover:scale-110 focus:scale-110' />
        <NotificationIcon className='h-8 w-8 cursor-pointer transition duration-200 ease-in-out hover:scale-110 focus:scale-110' />
        <Avatar className='h-8 w-8 cursor-pointer transition duration-200 ease-in-out hover:scale-110 focus:scale-110'>
          <AvatarImage src={url} alt={`user's avatar`} />
          <AvatarFallback className={cn('bg-background-light')}>
            <User className='text-muted-foreground' />
          </AvatarFallback>
        </Avatar>
      </div>
    </nav>
  );
};
