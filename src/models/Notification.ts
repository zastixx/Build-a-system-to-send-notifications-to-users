export enum NotificationType {
  EMAIL = 'email',
  SMS = 'sms',
  IN_APP = 'in_app',
}

export enum NotificationStatus {
  PENDING = 'pending',
  SENT = 'sent',
  FAILED = 'failed',
}

export interface Notification {
  id?: string;
  userId: string;
  type: NotificationType;
  title: string;
  content: string;
  status: NotificationStatus;
  createdAt: Date;
  updatedAt: Date;
  retryCount?: number;
}

export interface NotificationRequest {
  userId: string;
  type: NotificationType;
  title: string;
  content: string;
}
