import { NotificationDTO } from '@/features/notification/api/dto';
import { NotificationItem } from '@/features/notification/ui/NotificationItem';

const MOCK_NOTIFICATIONS: NotificationDTO[] = [
  {
    notificationId: 0,
    message: '알림 제목',
    notifyTime: '2025-03-27T12:56:37.669Z',
  },
  {
    notificationId: 1,
    message: '알림 제목 2',
    notifyTime: '2025-03-27T12:56:37.669Z',
  },
  {
    notificationId: 2,
    message: '알림 제목 3',
    notifyTime: '2025-03-27T12:56:37.669Z',
  },
  {
    notificationId: 3,
    message: '알림 제목2알림 제목2알림 제목2알림 제목2알림 제목2',
    notifyTime: '2025-03-27T12:56:37.669Z',
  },
  {
    notificationId: 4,
    message: '알림 제목 알림 제목 알림 제목 알림 제목 알림 제목',
    notifyTime: '2025-03-27T12:56:37.669Z',
  },
];

const WRAPPER_STYLES = 'rounded-md border bg-white shadow-md';

export const NotificationList = () => {
  if (MOCK_NOTIFICATIONS.length === 0)
    return (
      <div
        className={`${WRAPPER_STYLES} text-muted-foreground p-10 text-center text-sm`}
      >
        최근 30일동안 받은 알림이 없어요.
      </div>
    );

  return (
    <div
      className={`${WRAPPER_STYLES} 'flex max-h-72 w-48 flex-col divide-y overflow-auto`}
    >
      {MOCK_NOTIFICATIONS.map((notification) => (
        <NotificationItem key={notification.notificationId} {...notification} />
      ))}
    </div>
  );
};
