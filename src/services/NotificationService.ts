import { SendGridService } from '../services/SendGridService';
import { NotificationType, Notification, NotificationStatus } from '../models/Notification';

export class NotificationService {
  private notifications: Notification[] = [];
  private emailService: SendGridService;

  constructor() {
    this.emailService = new SendGridService();
  }

  async createNotification(
    userId: string,
    type: NotificationType,
    title: string,
    content: string
  ): Promise<Notification> {
    const notification: Notification = {
      id: Math.random().toString(36).substr(2, 9),
      userId,
      type,
      title,
      content,
      status: NotificationStatus.PENDING,
      createdAt: new Date(),
      updatedAt: new Date(),
      retryCount: 0,
    };

    this.notifications.push(notification);
    return notification;
  }

  async getUserNotifications(userId: string): Promise<Notification[]> {
    return this.notifications.filter((notification) => notification.userId === userId);
  }

  async processNotification(notification: Notification): Promise<void> {
    try {
      switch (notification.type) {
        case NotificationType.EMAIL:
          await this.emailService.sendEmail(notification);
          break;
        case NotificationType.SMS:
          // Implement SMS sending logic
          break;
        case NotificationType.IN_APP:
          // Store in-app notification
          break;
      }

      notification.status = NotificationStatus.SENT;
    } catch (error) {
      notification.status = NotificationStatus.FAILED;
      notification.retryCount = (notification.retryCount || 0) + 1;
      throw error;
    } finally {
      notification.updatedAt = new Date();
    }
  }
}
