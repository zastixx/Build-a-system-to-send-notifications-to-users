import { NotificationService } from '../services/NotificationService';
import { NotificationType, NotificationStatus } from '../models/Notification';

describe('NotificationService', () => {
  let notificationService: NotificationService;

  beforeEach(() => {
    notificationService = new NotificationService();
  });

  describe('createNotification', () => {
    it('should create a new notification', async () => {
      const notification = await notificationService.createNotification(
        'test-user',
        NotificationType.EMAIL,
        'Test Title',
        'Test Content'
      );

      expect(notification).toHaveProperty('id');
      expect(notification.userId).toBe('test-user');
      expect(notification.type).toBe(NotificationType.EMAIL);
      expect(notification.status).toBe(NotificationStatus.PENDING);
    });
  });

  describe('getUserNotifications', () => {
    it('should return user notifications', async () => {
      // Create a test notification
      await notificationService.createNotification(
        'test-user',
        NotificationType.EMAIL,
        'Test Title',
        'Test Content'
      );

      const notifications = await notificationService.getUserNotifications('test-user');
      expect(notifications).toHaveLength(1);
      expect(notifications[0].userId).toBe('test-user');
    });

    it('should return empty array for user with no notifications', async () => {
      const notifications = await notificationService.getUserNotifications('non-existent-user');
      expect(notifications).toHaveLength(0);
    });
  });
});
