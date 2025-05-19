import sgMail from '@sendgrid/mail';
import { Notification } from '../models/Notification';

export class SendGridService {
  constructor() {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');
  }

  async sendEmail(notification: Notification): Promise<void> {
    const msg = {
      to: notification.userId, // Assuming userId is the email address
      from: process.env.FROM_EMAIL || '',
      subject: notification.title,
      text: notification.content,
    };

    try {
      await sgMail.send(msg);
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }
}
