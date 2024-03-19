import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationService {
  sendEmail(to: string, subject: string, body: string): Promise<void> {
    console.debug(`email: ${subject}`);

    return Promise.resolve();
  }
}
