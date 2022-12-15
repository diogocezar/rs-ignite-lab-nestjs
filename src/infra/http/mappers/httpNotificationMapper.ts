import { Notification } from '@application/entities/notifications/notification';

export class HttpNotificationMapper {
  static toHttp(notification: Notification) {
    const { id, recipientId, content, category } = notification;
    return {
      id,
      content: content.value,
      category,
      recipientId,
    };
  }
}
