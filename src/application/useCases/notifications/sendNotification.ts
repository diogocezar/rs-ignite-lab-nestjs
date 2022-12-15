import { Injectable } from '@nestjs/common';
import { Notification } from '@application/entities/notifications/notification';
import { Content } from '@application/entities/notifications/props/content';
import { NotificationsRepository } from '@application/repositories/notifications/notificationsRepository';
import { makeNotification } from '@test/factories/notificationFactory';

export interface SendNotificationInput {
  recipientId: string;
  content: string;
  category: string;
}

export interface SendNotificationOutput {
  notification: Notification;
}

@Injectable()
export class SendNotification {
  constructor(private notificationsRepository: NotificationsRepository) {}
  async execute(input: SendNotificationInput): Promise<SendNotificationOutput> {
    const { recipientId, content, category } = input;
    const notification = makeNotification({
      recipientId,
      content: new Content(content),
      category,
    });
    await this.notificationsRepository.create(notification);
    return { notification };
  }
}
