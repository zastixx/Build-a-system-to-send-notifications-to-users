import dotenv from 'dotenv';

// Load environment variables from .env.test
dotenv.config({ path: '.env.test' });

// Mock QueueService
jest.mock('../queue/QueueService', () => {
  return {
    QueueService: jest.fn().mockImplementation(() => ({
      connect: jest.fn().mockResolvedValue(undefined),
      publishNotification: jest.fn().mockResolvedValue(undefined),
      consumeNotifications: jest.fn().mockResolvedValue(undefined),
      close: jest.fn().mockResolvedValue(undefined),
    })),
  };
});

// Mock SendGrid
jest.mock('@sendgrid/mail', () => ({
  setApiKey: jest.fn(),
  send: jest.fn().mockResolvedValue([{ statusCode: 202 }]),
}));
