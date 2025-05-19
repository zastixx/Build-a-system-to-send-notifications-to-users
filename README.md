# Notification Service

A robust notification service that supports multiple notification types (Email, SMS, and in-app notifications) with message queue integration for reliable delivery and retry mechanisms.

## Features

- Multiple notification types support:
  - Email (using SendGrid)
  - SMS (extensible for integration)
  - In-app notifications
- Message queue integration using RabbitMQ
- Automatic retry mechanism for failed notifications
- RESTful API endpoints
- TypeScript implementation

## Prerequisites

- Node.js (v14 or higher)
- RabbitMQ server
- SendGrid account (for email notifications)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd notification-service
```

2. Install dependencies:
```bash
npm install
```

3. Create .env file:
```bash
cp .env.example .env
```

4. Update the .env file with your configuration:
- Set your SendGrid API key
- Configure RabbitMQ URL
- Set other required environment variables

## Running the Service

1. Development mode:
```bash
npm run dev
```

2. Production mode:
```bash
npm run build
npm start
```

## API Endpoints

### Send Notification
```
POST /notifications

Request body:
{
  "userId": "string",
  "type": "email" | "sms" | "in_app",
  "title": "string",
  "content": "string"
}
```

### Get User Notifications
```
GET /users/{id}/notifications
```

## Architecture

- Express.js for REST API
- RabbitMQ for message queue
- SendGrid for email delivery
- TypeScript for type safety

## Error Handling

- Failed notifications are automatically retried up to 3 times
- Each retry is logged with increasing delay
- Failed notifications after max retries are marked as failed

## Future Improvements

1. Add database integration for persistent storage
2. Implement SMS provider integration
3. Add rate limiting
4. Add authentication and authorization
5. Add metrics and monitoring
6. Implement notification templates

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.