import { Notification } from '@application/entities/notifications/notification';

export class PrismaNotificationMapper {
  static toPrisma(notification: Notification) {
    const { id, recipientId, content, category, readAt, createdAt } =
      notification;
    return {
      id,
      category,
      content: content.value,
      recipientId,
      readAt,
      createdAt,
    };
  }
}
