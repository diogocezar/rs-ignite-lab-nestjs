import { Notification } from 'src/application/entities/notification/notification';
import { Content } from 'src/application/entities/notification/props/content';
import { NotificationsRepository } from 'src/application/repositories/notifications/notificationsRepository';

export interface SendNotificationInput {
  recipientId: string;
  content: string;
  category: string;
}

export interface SendNotificationOutput {
  notification: Notification;
}

export class SendNotification {
  constructor(private notificationsRepository: NotificationsRepository) {}
  async execute(input: SendNotificationInput): Promise<SendNotificationOutput> {
    const { recipientId, content, category } = input;
    const notification = new Notification({
      recipientId,
      content: new Content(content),
      category,
    });
    await this.notificationsRepository.create(notification);
    return { notification };
  }
}
