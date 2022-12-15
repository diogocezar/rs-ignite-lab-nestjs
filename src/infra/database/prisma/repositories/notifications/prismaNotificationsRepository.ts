import { Injectable } from '@nestjs/common';
import { Notification } from '@application/entities/notifications/notification';
import { NotificationsRepository } from '@application/repositories/notifications/notificationsRepository';
import { PrismaService } from '@infra/database/prisma/prisma.service';

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {
  constructor(private prismaService: PrismaService) {}
  async create(notification: Notification): Promise<void> {
    const { recipientId, content, category, readAt, createdAt } = notification;
    await this.prismaService.notification.create({
      data: {
        id: notification.id,
        category,
        content: content.value,
        recipientId,
        readAt,
        createdAt,
      },
    });
  }
}
