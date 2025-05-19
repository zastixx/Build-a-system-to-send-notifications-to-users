import express from 'express';
import dotenv from 'dotenv';
import { NotificationController } from './controllers/NotificationController';

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Initialize controller
const notificationController = new NotificationController();

// Routes
app.post('/notifications', (req, res) => notificationController.sendNotification(req, res));
app.get('/users/:id/notifications', (req, res) => notificationController.getUserNotifications(req, res));

// Start server
app.listen(port, () => {
  console.log(`Notification service listening on port ${port}`);
});
