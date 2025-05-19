import { Request, Response } from 'express';
import { NotificationService } from '../services/NotificationService';
import { QueueService } from '../queue/QueueService';
import { NotificationRequest, NotificationType } from '../models/Notification';

export class NotificationController {
  private notificationService: NotificationService;
  private queueService: QueueService;

  constructor() {
    this.notificationService = new NotificationService();
    this.queueService = new QueueService();
    this.initializeQueue();
  }

  private async initializeQueue(): Promise<void> {
    await this.queueService.connect();
    await this.queueService.consumeNotifications(async (notification) => {
      await this.notificationService.processNotification(notification);
    });
  }

  async sendNotification(req: Request, res: Response): Promise<void> {
    try {
      const { userId, type, title, content } = req.body;

      // Validate required fields
      if (!userId || !type || !title || !content) {
        res.status(400).json({ error: 'Missing required fields' });
        return;
      }

      // Validate notification type
      if (!Object.values(NotificationType).includes(type)) {
        res.status(400).json({ error: 'Invalid notification type' });
        return;
      }

      const notification = await this.notificationService.createNotification(
        userId,
        type,
        title,
        content
      );

      // Push to queue for processing
      await this.queueService.publishNotification(notification);

      res.status(201).json(notification);
    } catch (error) {
      res.status(500).json({ error: 'Failed to queue notification' });
    }
  }

  async getUserNotifications(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.id;
      const notifications = await this.notificationService.getUserNotifications(userId);
      res.json(notifications);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch notifications' });
    }
  }
}
