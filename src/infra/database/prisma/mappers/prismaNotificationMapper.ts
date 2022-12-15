import { Notification } from '@application/entities/notifications/notification';
import { Content } from '@application/entities/notifications/props/content';
import { Notification as RawNotification } from '@prisma/client';

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
  static toDomain(raw: RawNotification): Notification {
    const {
      id,
      recipientId,
      content,
      category,
      readAt,
      createdAt,
      canceledAt,
    } = raw;
    return new Notification(
      {
        category,
        content: new Content(content),
        recipientId,
        readAt,
        canceledAt,
        createdAt,
      },
      id,
    );
  }
}
