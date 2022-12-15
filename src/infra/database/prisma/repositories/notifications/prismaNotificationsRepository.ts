import { Injectable } from '@nestjs/common';
import { Notification } from '@application/entities/notifications/notification';
import { NotificationsRepository } from '@application/repositories/notifications/notificationsRepository';
import { PrismaService } from '@infra/database/prisma/prisma.service';
import { PrismaNotificationMapper } from '../../mappers/prismaNotificationMapper';

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {
  constructor(private prismaService: PrismaService) {}

  async create(notification: Notification): Promise<void> {
    const raw = PrismaNotificationMapper.toPrisma(notification);
    await this.prismaService.notification.create({
      data: raw,
    });
  }

  async findById(id: string): Promise<Notification | null> {
    const notification = await this.prismaService.notification.findUnique({
      where: { id },
    });
    if (!notification) return null;
    return PrismaNotificationMapper.toDomain(notification);
  }

  async save(notification: Notification): Promise<void> {
    const raw = PrismaNotificationMapper.toPrisma(notification);
    await this.prismaService.notification.update({
      where: { id: raw.id },
      data: raw,
    });
  }

  async countManyByRecipientId(recipientId: string): Promise<number> {
    const count = await this.prismaService.notification.count({
      where: { recipientId },
    });
    return count;
  }

  async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
    const notifications = await this.prismaService.notification.findMany({
      where: { recipientId },
    });
    return notifications.map(PrismaNotificationMapper.toDomain);
  }
}
