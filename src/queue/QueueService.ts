import { Notification } from '../models/Notification';

export interface IQueueService {
  connect(): Promise<void>;
  publishNotification(notification: Notification): Promise<void>;
  consumeNotifications(callback: (notification: Notification) => Promise<void>): Promise<void>;
  close(): Promise<void>;
}

// In-memory implementation for testing
export class QueueService implements IQueueService {
  private notifications: Notification[] = [];
  private callback?: (notification: Notification) => Promise<void>;

  async connect(): Promise<void> {
    // In-memory connection, no-op
    return Promise.resolve();
  }

  async publishNotification(notification: Notification): Promise<void> {
    this.notifications.push(notification);
    if (this.callback) {
      await this.callback(notification);
    }
    return Promise.resolve();
  }

  async consumeNotifications(callback: (notification: Notification) => Promise<void>): Promise<void> {
    this.callback = callback;
    // Process any existing notifications
    for (const notification of this.notifications) {
      await callback(notification);
    }
    return Promise.resolve();
  }

  async close(): Promise<void> {
    this.notifications = [];
    this.callback = undefined;
    return Promise.resolve();
  }
}
