import { NotificationDTO } from '@/features/notification/api/dto';

export const NotificationItem = ({ message, notifyTime }: NotificationDTO) => {
  return (
    <div className='flex flex-col gap-y-1 px-4 py-2'>
      <p className='text-sm'>{message}</p>
      <p className='text-muted-foreground text-xs'>{notifyTime}</p>
    </div>
  );
};
