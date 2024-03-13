import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationService {
  sendEmail(to: string, subject: string, body: string): Promise<void> {
    // code to send email
    return Promise.resolve();
  }
}
