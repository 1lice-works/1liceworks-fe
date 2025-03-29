export interface NotificationResponseDTO {
  isSuccess: boolean;
  code: number;
  message: string;
  result: NotificationDTO[];
}

export interface NotificationDTO {
  notificationId: number;
  message: string;
  notifyTime: string;
}
