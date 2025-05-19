import request from 'supertest';
import express from 'express';
import { NotificationController } from '../controllers/NotificationController';
import { NotificationType } from '../models/Notification';

describe('Notification API', () => {
  let app: express.Application;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    const notificationController = new NotificationController();
    app.post('/notifications', (req, res) => notificationController.sendNotification(req, res));
    app.get('/users/:id/notifications', (req, res) => notificationController.getUserNotifications(req, res));
  });

  describe('POST /notifications', () => {
    it('should create a new notification', async () => {
      const notification = {
        userId: 'test-user',
        type: NotificationType.EMAIL,
        title: 'Test Notification',
        content: 'This is a test notification',
      };

      const response = await request(app)
        .post('/notifications')
        .send(notification);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.userId).toBe(notification.userId);
      expect(response.body.type).toBe(notification.type);
    });

    it('should return 400 for invalid notification type', async () => {
      const notification = {
        userId: 'test-user',
        type: 'INVALID_TYPE',
        title: 'Test Notification',
        content: 'This is a test notification',
      };

      const response = await request(app)
        .post('/notifications')
        .send(notification);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });

    it('should return 400 for missing required fields', async () => {
      const notification = {
        userId: 'test-user',
        type: NotificationType.EMAIL,
      };

      const response = await request(app)
        .post('/notifications')
        .send(notification);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });
  });

  describe('GET /users/:id/notifications', () => {
    it('should get user notifications', async () => {
      const userId = 'test-user';

      const response = await request(app)
        .get(`/users/${userId}/notifications`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });
});
